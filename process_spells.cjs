
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
    const p = `data/data-spells-level${l}.ts`;
    if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8');
        let match;
        while ((match = idRegex.exec(content)) !== null) {
            nameToId[match[2]] = match[1];
        }
    }
}

// Also check main file just in case
if (fs.existsSync('data/data-spells.ts')) {
    const content = fs.readFileSync('data/data-spells.ts', 'utf8');
    let match;
    while ((match = idRegex.exec(content)) !== null) {
        nameToId[match[2]] = match[1];
    }
}

console.log(`Loaded ${Object.keys(nameToId).length} existing spell IDs.`);

// ... (existing CSV reading) ...

const spellsByLevel = Array(10).fill(null).map(() => []);

// ... (existing manualMappings and logic) ...

// ... (existing parsing loop) ...

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
    let content = `import { SpellItem } from '../types';\n\n`;
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
    const filename = `data/data-spells-level${l}.ts`;
    const varName = `SPELL_DB_LEVEL_${l}`;
    let title = `${l}环法术`;
    if (l === 0) title = '戏法 (Cantrips)';

    fs.writeFileSync(filename, generateTS(spellsByLevel[l], varName, title));
    console.log(`Generated ${filename} with ${spellsByLevel[l].length} spells.`);
}

// Generate data-spells.ts aggregator
let aggContent = `import { SpellItem } from '../types';\n`;
for (let l = 0; l <= 9; l++) {
    aggContent += `import { SPELL_DB_LEVEL_${l} } from './data-spells-level${l}';\n`;
}

aggContent += `\nexport const SPELL_DB: SpellItem[] = [\n`;
for (let l = 0; l <= 9; l++) {
    aggContent += `  ...SPELL_DB_LEVEL_${l},\n`;
}
aggContent += `];\n`;

fs.writeFileSync('data/data-spells.ts', aggContent);
console.log('Generated data-spells.ts aggregator.');
