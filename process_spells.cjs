
const fs = require('fs');
const path = require('path');

const csvPath = 'Spells.csv';
const tsPath = 'data-spells.ts';
const out0Path = 'data-spells-level0.ts';
const out1Path = 'data-spells-level1.ts';

// Helper to parse CSV line respecting quotes
function parseCSVLine(text) {
    const res = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuote) {
            if (c === '"') {
                if (i + 1 < text.length && text[i + 1] === '"') {
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
                res.push(cur);
                cur = '';
            } else {
                cur += c;
            }
        }
    }
    res.push(cur);
    return res;
}

// Read TS files to get existing IDs
const nameToId = {};
const idRegex = /id:\s*\"([^\"]+)\",\s*name:\s*\"([^\"]+)\"/g;

const filesToRead = [out0Path, out1Path];

for (const filePath of filesToRead) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        let match;
        while ((match = idRegex.exec(content)) !== null) {
            nameToId[match[2]] = match[1];
        }
    }
}

console.log(`Loaded ${Object.keys(nameToId).length} existing spell IDs.`);

// Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split(/\r?\n/);
const headers = parseCSVLine(lines[0]);

const spells0 = [];
const spells1 = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseCSVLine(line);

    // "Name","Source","Page","Level","Casting Time","Duration","School","Range","Components","Classes","Optional/Variant Classes","Text","At Higher Levels"
    const name = cols[0];
    const source = cols[1];
    const levelStr = cols[3];

    if (source !== "PHB'24") continue;

    let level = -1;
    if (levelStr === '戏法') level = 0;
    else if (levelStr === '1环') level = 1;
    else continue;

    let id = nameToId[name];

    // Manual mappings for name mismatches or new translations
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

    if (manualMappings[name]) {
        id = manualMappings[name];
    }

    if (!id) {
        // Fallback: Pinyin or English placeholder (But we don't have English names easily here)
        // Just use a placeholder ID if not found, filtering manually later might be needed if many missing.
        // But assume most are covered.
        id = 'todo-' + Math.random().toString(36).substring(7);
        console.log(`Warning: No ID found for ${name}`);
    }

    const castingTime = cols[4].replace(/^1\s+/, ''); // Remove "1 " prefix if common (e.g. "1 动作" -> "动作")
    const duration = cols[5]; // Keep as is or translate? CSV seems to have English "Instantaneous" etc sometimes?
    // Wait, let me check CSV content again.
    // L3: "Instantaneous". L2: "1 round".
    // TS uses "立即", "1分钟".
    // I should translate duration if it is English in CSV.

    const school = cols[6];
    const range = cols[7];
    const components = cols[8];
    const classes = cols[9].split(',').map(s => s.trim()).filter(s => s);
    const text = cols[11];
    const higher = cols[12];

    const spell = {
        id,
        name,
        source: "官方规则",
        level,
        school,
        castingTime: translateCastingTime(castingTime),
        range: range.replace(/-尺/g, '尺').replace(/Feet/g, '尺').replace(/Self/g, '自身').replace(/Touch/g, '触及'), // Simple cleanup
        components,
        duration: translateDuration(duration),
        classes,
        description: text + (higher ? (level === 0 ? '\n**戏法强化**: ' : '\n**升环施法**: ') + higher : '')
    };

    if (level === 0) spells0.push(spell);
    else spells1.push(spell);
}

function translateDuration(d) {
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
    c = c.replace('1 动作', '动作').replace('1 Action', '动作');
    c = c.replace('1 附赠动作', '附赠动作').replace('1 Bonus Action', '附赠动作');
    c = c.replace('1 反应', '反应').replace('1 Reaction', '反应');
    c = c.replace('1 Minute', '1分钟').replace('1 分钟', '1分钟');
    c = c.replace('10 Minutes', '10分钟').replace('10 分钟', '10分钟');
    c = c.replace('1 Hour', '1小时').replace('1 小时', '1小时');
    return c; // Fallback
}


function generateFileContent(spells, levelVarName) {
    let content = `import { SpellItem } from './types';\n\n`;
    content += `export const ${levelVarName}: SpellItem[] = [\n`;

    // Group comments? Maybe just list.
    content += spells.map(s => JSON.stringify(s, null, 2)).join(',\n');

    content += `\n];\n`;
    return content;
}

// Generate TS-like object string instead of JSON keys quoted
function formatSpell(s) {
    return `  {
    id: "${s.id}", name: "${s.name}", source: "${s.source}",
    level: ${s.level}, school: "${s.school}", castingTime: "${s.castingTime}", range: "${s.range}", components: "${s.components}", duration: "${s.duration}",
    classes: ${JSON.stringify(s.classes)},
    description: ${JSON.stringify(s.description)}
  }`;
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

fs.writeFileSync(out0Path, generateTS(spells0, 'SPELL_DB_LEVEL_0', '0环 戏法 (Cantrips)'));
fs.writeFileSync(out1Path, generateTS(spells1, 'SPELL_DB_LEVEL_1', '1环 法术 (Level 1 Spells)'));

console.log(`Generated ${out0Path} with ${spells0.length} spells.`);
console.log(`Generated ${out1Path} with ${spells1.length} spells.`);
