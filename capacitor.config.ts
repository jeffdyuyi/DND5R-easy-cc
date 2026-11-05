import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.nogubird.easycc',
    appName: '不咕鸟龙与地下城线下团辅助工具',
    webDir: 'dist-android',
    server: { hostname: 'localhost', androidScheme: 'https' },
};

export default config;
