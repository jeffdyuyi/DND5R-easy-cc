// scripts/convert_zh_data.ts
// 用于将中文data目录下的原始数据（Markdown/JSON）批量转换为 newdata 目录下的 TypeScript/JavaScript 结构化数据
// 仅为脚本主流程和核心函数示例，具体字段和文件名需结合实际补充

import * as fs from 'fs';
import * as path from 'path';

// 中文data目录和目标newdata目录
const zhDataRoot = path.resolve(__dirname, '../中文data');
const newDataRoot = path.resolve(__dirname, '../newdata');

// 字段映射表（可根据 newdata/数据结构梳理与映射.md 动态扩展）
const fieldMap: Record<string, string> = {
  '编号': 'id',
  '英文名': 'id',
  '名称': 'name',
  '描述': 'description',
  '特性': 'features',
  '技能': 'proficiencies',
  '装备': 'equipment',
  '属性加值': 'abilityScoreIncrease',
  // ...可继续补充
};

// 递归读取中文data下所有JSON文件
function getAllJsonFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsonFiles(filePath));
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  });
  return results;
}

// 字段映射与结构转换
function convertFields(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertFields);
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      const mappedKey = fieldMap[key] || key;
      result[mappedKey] = convertFields(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
}

// 主转换流程
function main() {
  const jsonFiles = getAllJsonFiles(zhDataRoot);
  jsonFiles.forEach(file => {
    const raw = fs.readFileSync(file, 'utf-8');
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.warn('跳过非标准JSON文件:', file);
      return;
    }
    const converted = convertFields(data);
    // 生成目标文件名
    const relPath = path.relative(zhDataRoot, file).replace(/\\/g, '/');
    const outPath = path.join(newDataRoot, relPath.replace('.json', '.ts'));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    // 导出为 TypeScript 模块
    const tsContent = `export default ${JSON.stringify(converted, null, 2)};\n`;
    fs.writeFileSync(outPath, tsContent, 'utf-8');
    console.log('已生成:', outPath);
  });
}

main();

// 说明：
// - 该脚本会将所有中文data下的JSON文件批量转换为newdata下的同名TS模块，字段自动映射。
// - Markdown等非JSON文件暂不处理，可后续扩展。
// - 运行前请确保已安装Node.js，且在项目根目录执行：node scripts/convert_zh_data.ts
// - 可根据newdata/数据结构梳理与映射.md补充字段映射和特殊处理逻辑。
