// scripts/validate_newdata.ts
// 用于校验 newdata 目录下的结构化数据完整性和类型正确性
// 可配合 convert_zh_data.ts 一起使用，自动输出校验报告

import * as fs from 'fs';
import * as path from 'path';

// 需要校验的主要数据文件
const filesToCheck = [
  'data-classes.ts',
  'data-subclasses.ts',
  'species.ts',
  'backgrounds.ts',
  'data-spells.ts',
  'data-feats.ts',
  'data-items-weapons.ts',
  'data-items-armor.ts',
  'data-items-tools.ts',
  'data-items-gear.ts',
  'data-items-magic.ts',
  'data-items-magic-armor.ts',
];

// 主要字段要求（可根据 newdata/数据结构梳理与映射.md 补充）
const requiredFields: Record<string, string[]> = {
  'data-classes.ts': ['id', 'name', 'description', 'features'],
  'species.ts': ['id', 'name', 'description', 'traits'],
  'backgrounds.ts': ['id', 'name', 'description', 'proficiencies'],
  'data-spells.ts': ['id', 'name', 'level', 'school', 'description'],
  // ... 其他类型可补充
};

const newdataRoot = path.resolve(__dirname, '../newdata');

function validateFile(file: string) {
  const filePath = path.join(newdataRoot, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`缺少文件: ${file}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  let data;
  try {
    // 只提取 export default 后的 JSON
    const match = content.match(/export default (.*);/s);
    if (!match) throw new Error('未找到 export default');
    data = eval('(' + match[1] + ')');
  } catch (e) {
    console.error(`解析失败: ${file}`, e);
    return;
  }
  const fields = requiredFields[file] || [];
  if (Array.isArray(data)) {
    data.forEach((item, idx) => {
      fields.forEach(f => {
        if (!(f in item)) {
          console.error(`${file} 第${idx + 1}项缺少字段: ${f}`);
        }
      });
    });
  } else if (typeof data === 'object') {
    fields.forEach(f => {
      if (!(f in data)) {
        console.error(`${file} 缺少字段: ${f}`);
      }
    });
  }
}

function main() {
  filesToCheck.forEach(validateFile);
  console.log('newdata 校验完成');
}

main();

// 说明：
// - 该脚本会校验 newdata 下主要数据文件的字段完整性，输出缺失字段和解析错误。
// - 可在 convert_zh_data.ts 执行后运行：node scripts/validate_newdata.ts
// - 可根据实际数据类型补充 requiredFields 和 filesToCheck。
