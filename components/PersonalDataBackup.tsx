import { useRef, useState } from 'react';
import { downloadJson, exportMessage } from '../utils/files';
const keys = ['easy_cc_favorites_v1', 'easy_cc_dice_formulas_v1', 'easy_cc_dice_history_v1'] as const;
export function PersonalDataBackup() {
    const input = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');
    const exportRecords = async (raw = false) => {
        try {
            const records = Object.fromEntries(keys.map(key => {
                const value = localStorage.getItem(key);
                return [key, raw ? value : value === null ? [] : JSON.parse(value)];
            }));
            const result = await downloadJson({ format: raw ? 'easy-cc-personal-raw' : 'easy-cc-personal', version: 1, records }, raw ? 'easy-cc-personal-original.json' : 'easy-cc-personal.json');
            setMessage(exportMessage(result));
        }
        catch (error) { setMessage('导出未完成：' + String(error) + '。如JSON损坏，请使用“导出原始记录”。'); }
    };
    const restore = async (file?: File) => {
        if (!file) return;
        try {
            const data = JSON.parse(await file.text());
            if (data?.format !== 'easy-cc-personal' || data.version !== 1 || !data.records || !keys.every(key => Array.isArray(data.records[key])))
                throw Error('不是有效的收藏与骰盘备份。');
            if (!data.records.easy_cc_favorites_v1.every((record: any) => record?.item && typeof record.item.id === 'string' && typeof record.item.kind === 'string' && typeof record.item.name === 'string' && typeof record.item.source === 'string')
                || !data.records.easy_cc_dice_formulas_v1.every((record: any) => typeof record?.id === 'string' && typeof record.name === 'string' && record.bag && typeof record.bag === 'object' && !Array.isArray(record.bag))
                || !data.records.easy_cc_dice_history_v1.every((record: any) => typeof record?.id === 'string' && Array.isArray(record.dice)))
                throw Error('备份条目结构无效。');
            const previous = keys.map(key => localStorage.getItem(key));
            if (!window.confirm('覆盖本机收藏、保存算式和投掷历史？请先导出当前备份，恢复后需刷新页面。')) return;
            // Recheck after confirmation; do not overwrite a change made by another page.
            if (keys.some((key, index) => localStorage.getItem(key) !== previous[index]))
                throw Error('其他页面已修改记录，本次恢复未执行，请刷新后重试。');
            const written: number[] = [];
            try {
                for (const [index, key] of keys.entries()) {
                    localStorage.setItem(key, JSON.stringify(data.records[key]));
                    written.push(index);
                }
            }
            catch (error) {
                const failed: string[] = [];
                for (const index of written.reverse()) {
                    try {
                        const key = keys[index];
                        if (previous[index] === null) localStorage.removeItem(key);
                        else localStorage.setItem(key, previous[index]!);
                    }
                    catch { failed.push(keys[index]); }
                }
                throw Error('恢复写入失败：' + String(error) + (failed.length ? '；以下记录未能回退，请保留备份并核对：' + failed.join('、') : '；已写入的记录已回退。'));
            }
            setMessage('已恢复，请刷新页面读取；刷新前不要继续编辑旧页面。');
        }
        catch (error) { setMessage(String(error)); }
    };
    return <section className="information-about-section"><h2>收藏与骰盘备份</h2><p>包含收藏快照、保存算式和投掷历史。角色与原文资料分别备份。</p>
        <div className="external-source-actions"><button type="button" onClick={() => exportRecords()}>导出</button><button type="button" onClick={() => exportRecords(true)}>导出原始记录</button><button type="button" onClick={() => input.current?.click()}>恢复</button></div>
        <input ref={input} type="file" accept=".json" hidden onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void restore(file); }}/>
        {message && <p role="status">{message}</p>}
    </section>;
}
