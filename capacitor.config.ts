import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.nogubird.easycc',
    appName: '不咕鸟面团辅助器',
    webDir: 'dist-android',
    server: { hostname: 'localhost', androidScheme: 'https' },
};

export default config;
