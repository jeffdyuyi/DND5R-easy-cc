/** Download data without modifying the saved record or exposing a data URI. */
export function downloadJson(value: unknown, filename: string): void {
    const text = JSON.stringify(value, null, 2);
    if (text === undefined) throw Error('没有可导出的JSON记录。');
    downloadText(text, filename);
}
export function downloadText(text: string, filename: string): void {
    const url = URL.createObjectURL(new Blob([text], { type: 'application/json;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}
/** Preserve even malformed JSON exactly, so recovery never replaces the only original. */
export function exportStoredRecord(key: string, filename: string): void {
    const raw = localStorage.getItem(key);
    if (raw === null) throw Error('没有可导出的原始记录：' + key);
    downloadText(raw, filename);
}
