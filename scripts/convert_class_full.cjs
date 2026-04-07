// scripts/convert_class_full.cjs
// CommonJS 版本，适配 Node.js "type": "module" 环境
const fs = require('fs');
const path = require('path');

const zhClassRoot = path.resolve(__dirname, '../中文data/01_职业与子职业');
const outDir = path.resolve(__dirname, '../newdata/classes');

function readJsonSafe(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return null;
  }
}

function mergeFeatures(featureFiles) {
  let features = [];
  for (const file of featureFiles) {
    const data = readJsonSafe(file);
    if (data && Array.isArray(data.classFeature)) {
      features = features.concat(data.classFeature);
    }
  }
  return features;
}

function mergeSubclasses(subclassDir) {
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

function mergeExtraFolders(classDir, exclude = ['01_职业特性', '02_子职业']) {
  if (!fs.existsSync(classDir)) return {};
  const folders = fs.readdirSync(classDir).filter(f => fs.statSync(path.join(classDir, f)).isDirectory() && !exclude.includes(f));
  const result = {};
  for (const folder of folders) {
    const folderPath = path.join(classDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    result[folder] = files.map(f => readJsonSafe(path.join(folderPath, f))).filter(Boolean);
  }
  return result;
}


function findMainJson(classFolder) {
  // 查找一级目录下唯一 .json 文件（忽略“修改备忘.md”等）
  const files = fs.readdirSync(classFolder).filter(f => f.endsWith('.json'));
  if (files.length === 1) return path.join(classFolder, files[0]);
  // 多于1个时优先找与文件夹名相关的，找不到则取第一个
  const folderName = path.basename(classFolder).replace(/^[0-9]+_/, '').toLowerCase();
  const found = files.find(f => f.toLowerCase().includes(folderName));
  return found ? path.join(classFolder, found) : path.join(classFolder, files[0]);
}

function convertClass(classFolder) {
  const mainJsonPath = findMainJson(classFolder);
  const baseJson = readJsonSafe(mainJsonPath);
  if (!baseJson) {
    console.warn('未找到主职业json:', classFolder);
    return;
  }
  // 合并所有职业特性
  const featureDir = path.join(classFolder, '01_职业特性');
  let featureFiles = [];
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
  const className = path.basename(classFolder).replace(/^[0-9]+_/, '');
  const outPath = path.join(outDir, `${className}.ts`);
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
