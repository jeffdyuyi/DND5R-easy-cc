# 不咕鸟龙与地下城线下团辅助工具 · easy-cc

面向龙与地下城五版线下跑团的资源查阅工具，提供5etools中文资料手动下载、本地缓存、解析引用、角色资源整理、收藏和骰盘。角色数值由玩家在纸质角色卡上记录。

底部五入口为骰子、速查、角色、规则、信息；角色包含起源、职业、特性、法术、背包。支持深色幻想与明亮冒险两套Kenney PNG主题及Fusion Pixel字体。完整PWA离线启动、自选存储目录和小程序/原生应用尚未实现。

## 开发与部署

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5195 --strictPort
```

本地地址为 http://127.0.0.1:5195/DND5R-easy-cc/ 。GitHub Pages工作流安装锁定依赖、构建dist并上传Pages产物。仓库不保存本机dist和node_modules。

## 仓库内容

- components、contexts、hooks、src、styles、data：运行源码、适配层及发布数据。
- public：应用实际使用的字体、图标、骰盘、美术、作者支持二维码及对应许可。
- .github/workflows：部署流程；package-lock.json用于依赖复现。
- docs、本地接手记录、参考PDF、历史归档、美术原始压缩包、用户角色导出和资料制作脚本只保留本地，不随仓库更新上传。

浏览器中的角色、收藏和外部原文缓存不会随源码推送到GitHub。不同站点地址的浏览器存储彼此独立；迁移前请在信息页导出相应备份。

## 内容与素材

中文主库接入 tjliqy/5etools-cn 的cn2.0分支，Homebrew按独立资料包处理。下载由玩家主动发起；外部内容不随应用源码整库发布。各条目保留出处及解析记录。

工具作者不拥有外部规则或译文的著作权。中文源许可原文位于public/sources，字体、图标、Kenney UI、Dice-Box及骰型图的作者与许可随实际素材保留。应用信息页提供查阅入口。不能以代码或某一素材的许可代替其他外部内容的许可。

公开版内置DND5eChm/SRD5.2Chm来源的中文资料，按CC BY 4.0保留署名、许可与转换记录，见public/sources/builtin-SRD-NOTICE.txt。2014中文库及参考PDF仍保留本地；PHB补文仅公开独立出处清单。本地data/builtin不作为公开部署依赖。
