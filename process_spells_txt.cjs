/**
 * 从参考文本文件(.txt)生成法术数据
 * 替代原来的CSV处理脚本
 */

const fs = require('fs');
const path = require('path');

// 读取现有ID映射以保持一致性
const nameToId = {};
const idRegex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;

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
console.log(`加载了 ${Object.keys(nameToId).length} 个现有法术ID。`);

// 手动ID映射
const manualMappings = {
    '酸液飞溅': 'acid-splash',
    '剑刃防护': 'blade-ward',
    '颤栗之触': 'chill-touch',
    '舞光术': 'dancing-lights',
    '德鲁伊伎俩': 'druidcraft',
    '魔能爆': 'eldritch-blast',
    '四象法门': 'elementalism',
    '火焰箭': 'fire-bolt',
    '交友术': 'friends',
    '神导术': 'guidance',
    '光亮术': 'light',
    '法师之手': 'mage-hand',
    '修复术': 'mending',
    '传讯术': 'message',
    '心灵之楔': 'mind-sliver',
    '次级幻象': 'minor-illusion',
    '毒气喷涌': 'poison-spray',
    '魔法伎俩': 'prestidigitation',
    '燃火术': 'produce-flame',
    '冷冻射线': 'ray-of-frost',
    '抵抗术': 'resistance',
    '圣火术': 'sacred-flame',
    '橡棍术': 'shillelagh',
    '电爪': 'shocking-grasp',
    '术法爆发': 'sorcerous-burst',
    '维生术': 'spare-the-dying',
    '点点星芒': 'starry-wisp',
    '奇术': 'thaumaturgy',
    '荆棘之鞭': 'thorn-whip',
    '鸣雷破': 'thunderclap',
    '亡者丧钟': 'toll-the-dead',
    '克敌先击': 'true-strike',
    '恶言相加': 'vicious-mockery',
    '光耀祷词': 'word-of-radiance'
};

// 学派翻译
const schoolMap = {
    '防护': '防护',
    '咒法': '咒法',
    '预言': '预言',
    '附魔': '附魔',
    '惑控': '惑控',
    '塑能': '塑能',
    '幻术': '幻术',
    '死灵': '死灵',
    '变化': '变化'
};

// 职业名称规范化
const classMap = {
    '法师': '法师',
    '术士': '术士',
    '牧师': '牧师',
    '德鲁伊': '德鲁伊',
    '吟游诗人': '吟游诗人',
    '魔契师': '邪术师',
    '邪术师': '邪术师',
    '游侠': '游侠',
    '圣武士': '圣武士'
};

/**
 * 解析单个法术文本块
 */
function parseSpellBlock(block, level) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 6) return null;

    // 第1行：法术名称（中文｜英文）
    const nameLine = lines[0];
    const nameMatch = nameLine.match(/^(.+?)(?:｜|\|)(.+)$/);
    let name = nameLine;
    if (nameMatch) {
        name = nameMatch[1].trim();
    }

    // 第2行：学派/环阶（职业列表）
    // 格式1 (戏法): "塑能 戏法（术士、法师）"
    // 格式2 (1-9环): "一环 防护（游侠、法师）"
    const infoLine = lines[1];
    let school = '';
    let classesStr = '';

    // 尝试格式1: 学派 戏法（职业）
    let infoMatch = infoLine.match(/^(\S+)\s+戏法（(.+?)）/);
    if (infoMatch) {
        school = infoMatch[1];
        classesStr = infoMatch[2];
    } else {
        // 尝试格式2: X环 学派（职业）
        infoMatch = infoLine.match(/^[一二三四五六七八九]\S*\s+(\S+)（(.+?)）/);
        if (infoMatch) {
            school = infoMatch[1];
            classesStr = infoMatch[2];
        }
    }

    if (!school || !classesStr) return null;

    const classes = classesStr.split(/[、,，]/).map(c => {
        const normalized = classMap[c.trim()];
        return normalized || c.trim();
    }).filter(c => c);

    // 第3-6行：施法参数
    let castingTime = '', range = '', components = '', duration = '';

    for (let i = 2; i < lines.length && i < 10; i++) {
        const line = lines[i];
        if (line.startsWith('施法时间：')) {
            castingTime = line.replace('施法时间：', '').trim();
        } else if (line.startsWith('施法距离：')) {
            range = line.replace('施法距离：', '').trim();
        } else if (line.startsWith('法术成分：')) {
            components = line.replace('法术成分：', '').trim()
                .replace(/V/g, '声音')
                .replace(/S/g, '姿势')
                .replace(/M/g, '材料');
        } else if (line.startsWith('持续时间：')) {
            duration = line.replace('持续时间：', '').trim();
        }
    }

    // 找到描述开始的位置（从"持续时间"行之后开始）
    let descStartIdx = 2;
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].startsWith('持续时间：')) {
            descStartIdx = i + 1;
            break;
        }
    }

    // 收集描述和升环效果
    let description = '';
    let higherLevel = '';

    for (let i = descStartIdx; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('戏法强化') || line.startsWith('升环施法')) {
            // 升环效果
            higherLevel = line.replace(/^戏法强化[.。：:]?\s*/, '')
                .replace(/^升环施法[.。：:]?\s*/, '')
                .trim();
        } else if (!line.startsWith('施法') && !line.startsWith('法术成分') && !line.startsWith('持续时间')) {
            // 普通描述行
            if (description) description += '\n';
            description += line;
        }
    }

    // 格式化描述：加粗效应名，斜体状态引用
    description = formatDescription(description);
    higherLevel = formatDescription(higherLevel);

    // 生成ID
    let id = nameToId[name] || manualMappings[name];
    if (!id) {
        // 生成基于名称的ID
        let hash = 0;
        for (let j = 0; j < name.length; j++) {
            hash = (hash << 5) - hash + name.charCodeAt(j);
        }
        id = 'gen-' + Math.abs(hash).toString(36);
    }

    return {
        id,
        name,
        source: "PHB'24",
        level,
        school,
        castingTime,
        range,
        components,
        duration,
        classes,
        description,
        higherLevel
    };
}

/**
 * 格式化描述文本
 */
function formatDescription(text) {
    if (!text) return '';

    // 效应名称加粗: 匹配 "中文名English" 后跟标点的模式
    text = text.replace(/([一-龥]+)([A-Za-z][A-Za-z\s']+)([。，．,\.\s])/g, '**$1**$3');

    // 状态条件斜体
    const statusConditions = ['昏迷', '束缚', '石化', '目盲', '耳聋', '恐慌', '魅惑',
        '中毒', '麻痹', '震慑', '倒地', '隐形', '力竭', '擒抱', '失能', '瘫痪'];
    statusConditions.forEach(status => {
        const regex = new RegExp(`(?<!\\*\\*)${status}(?!\\*\\*)(?=状态|效应|[，。、])`, 'g');
        text = text.replace(regex, `*${status}*`);
    });

    // 法术引用斜体
    text = text.replace(/(?<!\*)([一-龥]{2,6}术)(?!\*)/g, (match, spell) => {
        const excludeWords = ['法术', '戏法', '咒术'];
        if (excludeWords.includes(spell)) return match;
        return `*${spell}*`;
    });

    return text.trim();
}

/**
 * 解析整个法术文件
 */
function parseSpellFile(filePath, level) {
    const content = fs.readFileSync(filePath, 'utf8');
    // 使用空行分隔法术块
    const blocks = content.split(/\n\s*\n/).filter(b => b.trim().length > 0);

    const spells = [];
    for (const block of blocks) {
        const spell = parseSpellBlock(block, level);
        if (spell) {
            spells.push(spell);
        }
    }

    return spells;
}

/**
 * 格式化法术为TypeScript对象字符串
 */
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

/**
 * 生成TypeScript文件
 */
function generateTS(spells, levelVarName, title) {
    let content = `import { SpellItem } from './types';\n\n`;
    content += `export const ${levelVarName}: SpellItem[] = [\n`;
    content += `  // ==========================================\n`;
    content += `  // ${title} - PHB'24 Only\n`;
    content += `  // ==========================================\n\n`;
    content += spells.map(formatSpell).join(',\n\n');
    content += `\n];\n`;
    return content;
}

// 主处理逻辑
const spellsByLevel = [];

for (let l = 0; l <= 9; l++) {
    const filename = `${l}环.txt`;
    if (fs.existsSync(filename)) {
        const spells = parseSpellFile(filename, l);
        spellsByLevel[l] = spells;
        console.log(`解析 ${filename}: ${spells.length} 个法术`);
    } else {
        spellsByLevel[l] = [];
        console.log(`未找到 ${filename}`);
    }
}

// 生成各环阶文件
for (let l = 0; l <= 9; l++) {
    const filename = `data-spells-level${l}.ts`;
    const varName = `SPELL_DB_LEVEL_${l}`;
    let title = `${l}环法术`;
    if (l === 0) title = '戏法 (Cantrips)';

    fs.writeFileSync(filename, generateTS(spellsByLevel[l], varName, title));
    console.log(`生成 ${filename}: ${spellsByLevel[l].length} 个法术`);
}

// 生成聚合文件
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
console.log('生成 data-spells.ts 聚合文件。');

// 统计
const total = spellsByLevel.reduce((sum, arr) => sum + arr.length, 0);
console.log(`\n总计: ${total} 个法术`);
