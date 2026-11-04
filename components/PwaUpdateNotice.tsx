import { applyPwaUpdate, usePwa } from '../src/pwa/client';
export function PwaUpdateNotice() {
    const state = usePwa();
    return state.update ? <aside className="pwa-update-notice" role="status"><span>新版应用已就绪</span><button type="button" onClick={applyPwaUpdate}>更新并刷新</button></aside> : null;
}
