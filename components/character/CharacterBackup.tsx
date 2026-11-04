import { useRef } from 'react';
import { useCharacters } from '../../contexts/CharacterContext';

export function CharacterBackup() {
    const { importCharacters, exportCharacters } = useCharacters();
    const input = useRef<HTMLInputElement>(null);
    const restore = async (file?: File) => {
        if (!file) return;
        try { importCharacters(JSON.parse(await file.text())); }
        catch { window.alert('恢复失败：无法读取角色备份JSON。'); }
        finally { if (input.current) input.current.value = ''; }
    };
    return <section className="information-about-section"><h2>本工具角色备份</h2><p>仅支持本工具的角色JSON存档，不是其他角色卡或VTT的交换格式。</p>
        <div className="external-source-actions"><button type="button" onClick={exportCharacters}>备份角色</button><button type="button" onClick={() => { const raw = localStorage.getItem('dnd_characters_v1'); if (raw !== null) { const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = 'easy-cc-characters-original.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); } }}>导出原始记录</button><button type="button" onClick={() => input.current?.click()}>恢复角色备份</button></div>
        <input ref={input} type="file" accept=".json,application/json" hidden onChange={event => void restore(event.target.files?.[0])}/>
    </section>;
}
