import { Capacitor, registerPlugin } from '@capacitor/core';
export type ExportResult = 'saved' | 'downloaded' | 'cancelled';
const nativeExport = registerPlugin<{ save(options:{ filename:string; text:string }):Promise<{status:'saved'|'cancelled'}> }>('DocumentExport');
export const exportMessage = (result:ExportResult) => result === 'saved' ? '已保存文件。' : result === 'cancelled' ? '已取消导出。' : '已发起下载，请保留文件。';
/** Android uses the system document picker; web retains its browser download flow. */
export async function downloadJson(value: unknown, filename: string): Promise<ExportResult> {
    const text = JSON.stringify(value, null, 2);
    if (text === undefined) throw Error('没有可导出的JSON记录。');
    return downloadText(text, filename);
}
export async function downloadText(text:string, filename:string):Promise<ExportResult> {
    if (Capacitor.getPlatform() === 'android') return (await nativeExport.save({filename,text})).status;
    const url = URL.createObjectURL(new Blob([text], {type:'application/json;charset=utf-8'}));
    const anchor = document.createElement('a');
    try { anchor.href=url; anchor.download=filename; document.body.appendChild(anchor); anchor.click(); }
    finally { anchor.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
    return 'downloaded';
}
/** Preserve malformed JSON exactly. Cancellation must never authorize a restore. */
export async function exportStoredRecord(key:string, filename:string):Promise<ExportResult> {
    const raw=localStorage.getItem(key);
    if(raw===null) throw Error('没有可导出的原始记录：'+key);
    return downloadText(raw,filename);
}
