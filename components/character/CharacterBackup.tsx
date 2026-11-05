import { useRef } from 'react';
import { useCharacters } from '../../contexts/CharacterContext';
import { exportStoredRecord } from '../../utils/files';
import { CHARACTERS_STORAGE_KEY } from '../../src/character/persistence';

export function CharacterBackup() {
    const { importCharacters, exportCharacters } = useCharacters();
    const input = useRef<HTMLInputElement>(null);
    const restore = async (file?: File) => {
        if (!file) return;
        try { importCharacters(JSON.parse(await file.text())); }
        catch (error) { window.alert('恢复失败：' + String(error)); }
        finally { if (input.current) input.current.value = ''; }
    };
    return <section className="information-about-section"><h2>本工具角色备份</h2><p>仅支持本工具的角色JSON存档，不是其他角色卡或VTT的交换格式。</p>
        <div className="external-source-actions"><button type="button" onClick={exportCharacters}>备份角色</button><button type="button" onClick={() => { try { exportStoredRecord(CHARACTERS_STORAGE_KEY, 'easy-cc-characters-original.json'); } catch (error) { window.alert(String(error)); } }}>导出原始记录</button><button type="button" onClick={() => input.current?.click()}>恢复角色备份</button></div>
        <input ref={input} type="file" accept=".json,application/json" hidden onChange={event => void restore(event.target.files?.[0])}/>
    </section>;
}
