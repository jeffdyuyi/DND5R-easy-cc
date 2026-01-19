
const fs = require('fs');
const path = require('path');

const csvPath = 'Spells.csv';

// Helper to parse CSV robustly (handling newlines inside quotes)
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let cur = '';
    let inQuote = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];

        if (inQuote) {
            if (c === '"') {
                if (next === '"') {
                    cur += '"';
                    i++;
                } else {
                    inQuote = false;
                }
            } else {
                cur += c;
            }
        } else {
            if (c === '"') {
                inQuote = true;
            } else if (c === ',') {
                currentRow.push(cur);
                cur = '';
            } else if (c === '\n' || (c === '\r' && next === '\n')) {
                currentRow.push(cur);
                rows.push(currentRow);
                currentRow = [];
                cur = '';
                if (c === '\r') i++;
            } else if (c === '\r') {
                // Just CR
                currentRow.push(cur);
                rows.push(currentRow);
                currentRow = [];
                cur = '';
            } else {
                cur += c;
            }
        }
    }
    if (cur || currentRow.length > 0) {
        currentRow.push(cur);
        rows.push(currentRow);
    }
    return rows;
}

// Read TS files to get existing IDs to preserve them if possible
const nameToId = {};
const idRegex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;

// Scan all potential existing files
for (let l = 0; l <= 9; l++) {
    const p = `data-spells-level${l}.ts`;
    if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8');
        let match;
        while ((match = idRegex.exec(content)) !== null) {
            nameToId[match[2]] = match[1];
        }
    }
}

// Also check main file just in case
if (fs.existsSync('data-spells.ts')) {
    const content = fs.readFileSync('data-spells.ts', 'utf8');
    let match;
    while ((match = idRegex.exec(content)) !== null) {
        nameToId[match[2]] = match[1];
    }
}

console.log(`Loaded ${Object.keys(nameToId).length} existing spell IDs.`);

// Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);

// Headers: "Name","Source","Page","Level","Casting Time","Duration","School","Range","Components","Classes","Optional/Variant Classes","Text","At Higher Levels"
const HEADER = rows[0];
const map = {
    name: HEADER.indexOf('Name'),
    source: HEADER.indexOf('Source'),
    level: HEADER.indexOf('Level'),
    time: HEADER.indexOf('Casting Time'),
    duration: HEADER.indexOf('Duration'),
    school: HEADER.indexOf('School'),
    range: HEADER.indexOf('Range'),
    comp: HEADER.indexOf('Components'),
    classes: HEADER.indexOf('Classes'),
    variantClasses: HEADER.indexOf('Optional/Variant Classes'),
    text: HEADER.indexOf('Text'),
    higher: HEADER.indexOf('At Higher Levels')
};

const spellsByLevel = Array(10).fill(null).map(() => []);

// Manual mappings
const manualMappings = {
    '次级幻影': 'minor-illusion',
    '毒气喷溅': 'poison-spray',
    '提升抗性': 'resistance',
    '净化食粮': 'purify-food-and-drink',
    '棘雹术': 'hail-of-thorns',
    '艾嘉西斯之铠': 'armor-of-agathys',
    '诱捕打击': 'ensnaring-strike',
    '造水术／枯水术': 'create-or-destroy-water',
    '魅惑人类': 'charm-person',
    '星界小精灵': 'starry-wisp',
    '魔法爆发': 'sorcerous-burst',
    '克敌机先': 'true-strike',
    '元素主义': 'elementalism'
};

function formatDescription(text) {
    if (!text) text = "";

    // 1. 效应名称加粗: 匹配 "中文名English" 后跟标点的模式
    // 例如: "埋葬Burial。" -> "**埋葬**。"
    // 例如: "锁链Chaining。" -> "**锁链**。"
    text = text.replace(/([一-龥]+)([A-Za-z][A-Za-z\s']+)([。，．,\.]\s*)/g, '**$1**$3');

    // 2. 带括号的效应名也加粗: "微缩牢笼Minimus Containment。"
    text = text.replace(/([一-龥]+)\s*([A-Z][a-zA-Z\s]+)([。，．,\.])/g, '**$1**$3');

    // 3. 状态条件斜体
    const statusConditions = [
        '昏迷', '束缚', '石化', '目盲', '耳聋', '恐慌', '魅惑',
        '中毒', '麻痹', '震慑', '倒地', '隐形', '力竭', '擒抱',
        '失能', '瘫痪'
    ];
    statusConditions.forEach(status => {
        // 匹配 "状态" 但不匹配已在加粗中的
        const regex = new RegExp(`(?<!\\*\\*)${status}(?!\\*\\*)(?=状态|效应|[，。、])`, 'g');
        text = text.replace(regex, `*${status}*`);
    });

    // 4. 法术引用斜体: 匹配 "XX术" 模式的法术名
    // 避免重复处理已经斜体化的内容
    text = text.replace(/(?<!\*)([一-龥]{2,6}术)(?!\*)/g, (match, spell) => {
        // 排除一些非法术名的词
        const excludeWords = ['法术', '戏法', '咒术'];
        if (excludeWords.includes(spell)) return match;
        return `*${spell}*`;
    });

    // 5. 其他常见法术引用
    const spellRefs = ['反魔法力场', '解除魔法', '高等复原', '造风术', '穿墙术', '昼明术'];
    spellRefs.forEach(spell => {
        const regex = new RegExp(`(?<!\\*)${spell}(?!\\*)`, 'g');
        text = text.replace(regex, `*${spell}*`);
    });

    // 6. 优化分段：在效应选项前添加换行
    // 匹配 "**效应名**。" 后面跟着描述，在其前添加换行
    text = text.replace(/([。！？])\s*(\*\*[^*]+\*\*[。，])/g, '$1\n\n$2');

    // 7. 清理多余空格和换行
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.trim();

    return text;
}

function formatHigherLevel(higher, level) {
    if (!higher || higher === "0" || higher.trim() === "") return "";

    let higherText = higher.trim();
    // Remove common prefixes in CSV to avoid duplication
    higherText = higherText.replace(/^升环施法效应[.:：]?\s*/, '');
    higherText = higherText.replace(/^At Higher Levels[.:]?\s*/i, '');
    higherText = higherText.replace(/^戏法升级[.:：]?\s*/, '');

    return higherText;
}

function translateDuration(d) {
    if (!d) return "-";
    if (d === 'Instantaneous') return '立即';
    if (d.includes('Concentration')) {
        return d.replace('Concentration, up to ', '专注，至多').replace('1 minute', '1分钟').replace('10 minutes', '10分钟').replace('1 hour', '1小时').replace('8 hours', '8小时').replace('24 hours', '24小时');
    }
    if (d === '1 minute') return '1分钟';
    if (d === '10 minutes') return '10分钟';
    if (d === '1 hour') return '1小时';
    if (d === '8 hours') return '8小时';
    if (d === '24 hours') return '24小时';
    if (d === 'Until 解除' || d === 'Until dispelled') return '直到被解除';
    if (d === '1 round') return '1轮';
    return d;
}

function translateCastingTime(c) {
    if (!c) return "-";
    c = c.replace('1 动作', '动作').replace('1 Action', '动作');
    c = c.replace('1 附赠动作', '附赠动作').replace('1 Bonus Action', '附赠动作');
    c = c.replace('1 反应', '反应').replace('1 Reaction', '反应');
    c = c.replace('1 Minute', '1分钟').replace('1 分钟', '1分钟');
    c = c.replace('10 Minutes', '10分钟').replace('10 分钟', '10分钟');
    c = c.replace('1 Hour', '1小时').replace('1 小时', '1小时');
    return c;
}

for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    if (cols.length < 5) continue; // Invalid row

    const name = cols[map.name];
    if (!name) continue;

    const source = cols[map.source];

    // 仅保留 PHB'24 法术
    if (source !== "PHB'24") continue;

    const levelStr = cols[map.level];

    let level = -1;
    if (levelStr === '戏法' || levelStr === '0环') level = 0;
    else if (levelStr && levelStr.includes('环')) level = parseInt(levelStr.replace('环', ''));
    else if (!isNaN(parseInt(levelStr))) level = parseInt(levelStr);

    if (level === -1 || isNaN(level)) {
        continue;
    }

    let id = nameToId[name];
    if (manualMappings[name]) id = manualMappings[name];

    if (!id) {
        let hash = 0;
        for (let j = 0; j < name.length; j++) hash = (hash << 5) - hash + name.charCodeAt(j);
        id = 'gen-' + Math.abs(hash).toString(36);
    }

    // Merge base classes with variant classes
    let allClasses = [];
    if (cols[map.classes]) {
        allClasses = cols[map.classes].split(',').map(s => s.trim()).filter(s => s);
    }
    if (cols[map.variantClasses]) {
        const variantClasses = cols[map.variantClasses].split(',').map(s => s.trim()).filter(s => s);
        variantClasses.forEach(vc => {
            if (!allClasses.includes(vc)) allClasses.push(vc);
        });
    }

    const higherLevel = formatHigherLevel(cols[map.higher], level);

    const spell = {
        id,
        name,
        source: source || "PF",
        level,
        school: cols[map.school],
        castingTime: translateCastingTime(cols[map.time]),
        range: cols[map.range].replace(/-尺/g, '尺').replace(/Feet/g, '尺').replace(/Self/g, '自身').replace(/Touch/g, '触及'),
        components: cols[map.comp],
        duration: translateDuration(cols[map.duration]),
        classes: allClasses,
        description: formatDescription(cols[map.text]),
        higherLevel: higherLevel
    };

    if (level >= 0 && level <= 9) {
        spellsByLevel[level].push(spell);
    }
}

// Generate Files
function formatSpell(s) {
    let output = `  {
    id: "${s.id}", name: "${s.name}", source: "${s.source}",
    level: ${s.level}, school: "${s.school}", castingTime: "${s.castingTime}", range: "${s.range}", components: "${s.components}", duration: "${s.duration}",
    classes: ${JSON.stringify(s.classes)},
    description: ${JSON.stringify(s.description)}`;
    if (s.higherLevel) {
        output += `,\n    higherLevel: ${JSON.stringify(s.higherLevel)}`;
    }
    output += `\n  }`;
    return output;
}

function generateTS(spells, levelVarName, title) {
    let content = `import { SpellItem } from './types';\n\n`;
    content += `export const ${levelVarName}: SpellItem[] = [\n`;
    content += `  // ==========================================\n`;
    content += `  // ${title}\n`;
    content += `  // ==========================================\n`;
    content += spells.map(formatSpell).join(',\n');
    content += `\n];\n`;
    return content;
}

// Generate level files
for (let l = 0; l <= 9; l++) {
    const filename = `data-spells-level${l}.ts`;
    const varName = `SPELL_DB_LEVEL_${l}`;
    let title = `${l}环法术`;
    if (l === 0) title = '戏法 (Cantrips)';

    fs.writeFileSync(filename, generateTS(spellsByLevel[l], varName, title));
    console.log(`Generated ${filename} with ${spellsByLevel[l].length} spells.`);
}

// Generate data-spells.ts aggregator
let aggContent = `import { SpellItem } from './types';\n`;
for (let l = 0; l <= 9; l++) {
    aggContent += `import { SPELL_DB_LEVEL_${l} } from './data-spells-level${l}';\n`;
}

aggContent += `\nexport const SPELL_DB: SpellItem[] = [\n`;
for (let l = 0; l <= 9; l++) {
    aggContent += `  ...SPELL_DB_LEVEL_${l},\n`;
}
aggContent += `];\n`;

fs.writeFileSync('data-spells.ts', aggContent);
console.log('Generated data-spells.ts aggregator.');
