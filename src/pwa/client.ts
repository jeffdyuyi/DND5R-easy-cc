import { useSyncExternalStore } from 'react';
import { IS_ANDROID_BUILD } from '../platform/build';
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
type State = { supported: boolean; registered: boolean; ready: boolean; checking: boolean; update: boolean; installable: boolean; installed: boolean; version: string; error: string; development: boolean };
let state: State = { supported: false, registered: false, ready: false, checking: false, update: false, installable: false, installed: false, version: '', error: '', development: import.meta.env.DEV };
let registration: ServiceWorkerRegistration | undefined, installEvent: InstallEvent | undefined;
const listeners = new Set<() => void>();
const publish = (patch: Partial<State>) => { state = { ...state, ...patch }; listeners.forEach(listener => listener()); };
export function usePwa() { return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => state); }
async function readStatus() {
    if (!registration?.active) return;
    const channel = new MessageChannel();
    const timer = setTimeout(() => { channel.port1.close(); }, 5000);
    channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); publish({ ready: event.data.ready === true, version: event.data.version || '', error: event.data.ready ? '' : '应用离线包不完整，请联网重新下载。' }); };
    registration.active.postMessage({ type: 'SHELL_STATUS' }, [channel.port2]);
}
export function registerPwa() {
    if (IS_ANDROID_BUILD) return;
    publish({ supported: 'serviceWorker' in navigator && window.isSecureContext, installed: matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true });
    window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installEvent = event as InstallEvent; publish({ installable: true }); });
    window.addEventListener('appinstalled', () => { installEvent = undefined; publish({ installed: true, installable: false }); });
    if (!state.supported || import.meta.env.DEV) return;
    let controlled = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (controlled) location.reload();
        else { controlled = true; void readStatus(); }
    });
    void navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js', { scope: import.meta.env.BASE_URL, updateViaCache: 'none' }).then(reg => {
        registration = reg;
        publish({ registered:true, update: !!reg.waiting });
        void readStatus();
        const observe = () => {
            const worker = reg.installing; if (!worker) return;
            worker.addEventListener('statechange', () => {
                if (worker.state === 'installed') { publish({ update: !!reg.waiting && !!reg.active }); void readStatus(); }
                if (worker.state === 'redundant') publish({ error: '应用离线包下载未完成，请联网后重试。已有资料和旧离线包保留。' });
            });
        };
        reg.addEventListener('updatefound', observe); observe();
        void navigator.serviceWorker.ready.then(() => readStatus());
    }).catch(error => publish({ error: '应用离线服务未启用：' + String(error) }));
}
export async function installPwa() {
    if (!installEvent) return;
    const event = installEvent; installEvent = undefined; publish({ installable: false });
    try { await event.prompt(); await event.userChoice; } catch (error) { publish({ error: String(error) }); }
}
export async function checkPwaUpdate() {
    if (!registration || state.checking) return;
    publish({ checking: true, error: '' });
    try {
        await registration.update(); publish({ update: !!registration.waiting });
        if (!state.ready && registration.active) await new Promise<void>((resolve, reject) => {
            const channel = new MessageChannel();
            const timer = setTimeout(() => { channel.port1.close(); reject(Error('离线包下载超时，请重试。')); }, 120000);
            channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); event.data.ok ? resolve() : reject(Error('离线包未下载完整。')); };
            registration!.active!.postMessage({ type: 'REPAIR_SHELL' }, [channel.port2]);
        });
        await readStatus();
    }
    catch (error) { publish({ error: '检查未完成，请确认网络连接：' + String(error) }); }
    finally { publish({ checking: false }); }
}
export function applyPwaUpdate() {
    if (registration?.waiting && confirm('更新应用并刷新？其他打开的本工具页面也会刷新，请先结束投骰、下载和未完成的选择。角色和资料存储保留。')) registration.waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
}
export async function requestPersistentStorage() {
    try { return !!(await navigator.storage?.persist?.()); } catch { return false; }
}
