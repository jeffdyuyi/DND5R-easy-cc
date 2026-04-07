// scripts/convert_class_full.ts
// 自动化提取并整合单一职业的所有信息（基础、特性、子职业及其它子文件夹）
// 用于 newdata/classes 目录批量生成

import * as fs from 'fs';
import * as path from 'path';

const zhClassRoot = path.resolve(__dirname, '../中文data/01_职业与子职业');
const outDir = path.resolve(__dirname, '../newdata/classes');

function readJsonSafe(file: string) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return null;
  }
}

function mergeFeatures(featureFiles: string[]): any[] {
  let features: any[] = [];
  for (const file of featureFiles) {
    const data = readJsonSafe(file);
    if (data && Array.isArray(data.classFeature)) {
      features = features.concat(data.classFeature);
    }
  }
  return features;
}

function mergeSubclasses(subclassDir: string): any[] {
  if (!fs.existsSync(subclassDir)) return [];
  const files = fs.readdirSync(subclassDir).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const data = readJsonSafe(path.join(subclassDir, f));
    if (!data) return null;
    return {
      name: data.name,
      shortName: data.shortName,
      source: data.source,
      features: data.features || [],
      subclassFeatures: data.subclassFeatures || []
    };
  }).filter(Boolean);
}

function mergeExtraFolders(classDir: string, exclude: string[] = ['01_职业特性', '02_子职业']) {
  if (!fs.existsSync(classDir)) return {};
  const folders = fs.readdirSync(classDir).filter(f => fs.statSync(path.join(classDir, f)).isDirectory() && !exclude.includes(f));
  const result: Record<string, any> = {};
  for (const folder of folders) {
    const folderPath = path.join(classDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    result[folder] = files.map(f => readJsonSafe(path.join(folderPath, f))).filter(Boolean);
  }
  return result;
}

function convertClass(classFolder: string) {
  const className = path.basename(classFolder);
  const baseJson = readJsonSafe(path.join(classFolder, `${className.replace(/^[0-9]+_/, '')}.json`));
  if (!baseJson) {
    console.warn('未找到主职业json:', classFolder);
    return;
  }
  // 合并所有职业特性
  const featureDir = path.join(classFolder, '01_职业特性');
  let featureFiles: string[] = [];
  if (fs.existsSync(featureDir)) {
    featureFiles = fs.readdirSync(featureDir).filter(f => f.endsWith('.json')).map(f => path.join(featureDir, f));
  }
  const features = mergeFeatures(featureFiles);
  // 合并所有子职业
  const subclassDir = path.join(classFolder, '02_子职业');
  const subclasses = mergeSubclasses(subclassDir);
  // 合并其它子文件夹
  const extra = mergeExtraFolders(classFolder);
  // 输出
  const outObj = {
    base: baseJson,
    features,
    subclasses,
    ...extra
  };
  const outPath = path.join(outDir, `${className.replace(/^[0-9]+_/, '')}.ts`);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, `export default ${JSON.stringify(outObj, null, 2)};\n`, 'utf-8');
  console.log('已生成:', outPath);
}

function main() {
  const classFolders = fs.readdirSync(zhClassRoot).filter(f => fs.statSync(path.join(zhClassRoot, f)).isDirectory());
  for (const folder of classFolders) {
    convertClass(path.join(zhClassRoot, folder));
  }
  console.log('全部职业转换完成');
}

main();

// 说明：
// - 该脚本会自动遍历所有职业目录，整合主json、职业特性、子职业及其它子文件夹内容，输出到 newdata/classes 下。
// - 结构为 { base, features, subclasses, ...其它子文件夹 }，便于后续统一调用。
// - 可多次运行，支持增量更新。
