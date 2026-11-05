import { Capacitor, registerPlugin } from '@capacitor/core';

export interface ResourceFiles {
    read(options: { name: string }): Promise<{ text: string | null }>;
    write(options: { name: string; text: string }): Promise<void>;
    active(): Promise<{ version: string | null }>;
    activate(options: { version: string; expected: string | null }): Promise<void>;
    discard(options: { name: string }): Promise<void>;
}
const files = registerPlugin<ResourceFiles>('ResourceFiles');

/** Private JSON files only. Web builds must continue using IndexedDB. */
export function nativeResourceFiles(): ResourceFiles {
    if (Capacitor.getPlatform() !== 'android') throw Error('原生资料文件仅用于Android应用。');
    return files;
}
