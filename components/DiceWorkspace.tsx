import { useEffect, useRef, useState } from 'react';
import type DiceBox from '@3d-dice/dice-box';
import { useLocalStorage } from '../hooks/useLocalStorage';
const sides = [4, 6, 8, 10, 12, 20, 100] as const;
type RollMode = 'normal' | 'advantage' | 'disadvantage';
interface Formula {
    id: string;
    name: string;
    bag: Record<number, number>;
    modifier: number;
    mode: RollMode;
}
interface RollRecord {
    id: string;
    notation: string;
    dice: {
        sides: number;
        value: number;
    }[];
    modifier: number;
    total: number;
    mode: RollMode;
    at: string;
    rendered: boolean;
}
function randomDie(faces: number) {
    const buffer = new Uint32Array(1), limit = Math.floor(4294967296 / faces) * faces;
    do {
        crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return buffer[0] % faces + 1;
}
function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> { return new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('dice timeout')), milliseconds); promise.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); }); }); }
/** Official Chequered Ink sprites; attribution and terms accompany local assets. */
function DiePreview({ sides }: {
    sides: number;
}) { return <img className="die-preview" src={import.meta.env.BASE_URL + 'dice/chequered-ink/d' + sides + '.png'} alt="" draggable={false}/>; }
export default function DiceWorkspace({ active }: {
    active: boolean;
}) {
    const [bag, setBag] = useState<Record<number, number>>({ 20: 1 }), [modifier, setModifier] = useState(0), [busy, setBusy] = useState(false), [ready, setReady] = useState(false), [simple, setSimple] = useState(false), [error, setError] = useState('');
    const [mode, setMode] = useState<RollMode>('normal'), [drawer, setDrawer] = useState<'presets' | 'history' | null>(null), [rightTab, setRightTab] = useState<'presets' | 'history'>('presets'), [formulaName, setFormulaName] = useState(''), [tableCount, setTableCount] = useState(0), [fullscreen, setFullscreen] = useState(false);
    const studio = useRef<HTMLElement>(null);
    const [refresh, setRefresh] = useLocalStorage<boolean>('easy_cc_dice_refresh_each_round_v1', true);
    const [saved, setSaved] = useLocalStorage<Formula[]>('easy_cc_dice_formulas_v1', []);
    const formulas = Array.isArray(saved) ? saved.filter(item => item?.id && item.bag && typeof item.name === 'string') : [];
    const [stored, setHistory] = useLocalStorage<RollRecord[]>('easy_cc_dice_history_v1', []);
    const history = Array.isArray(stored) ? stored.filter(record => record?.id && Array.isArray(record.dice)).slice(0, 20) : [];
    const instance = useRef<DiceBox | null>(null), pending = useRef<Promise<DiceBox> | null>(null), rolling = useRef(false);
    const groups = sides.filter(side => bag[side] > 0).map(side => ({ sides: side, qty: bag[side] }));
    const count = groups.reduce((sum, group) => sum + group.qty, 0);
    const requestFor = (bag: Record<number, number>, mode: RollMode) => mode === 'normal' ? sides.filter(side => Number.isInteger(bag[side]) && bag[side] > 0).map(side => ({ sides: side, qty: Math.min(20, bag[side]) })) : [{ sides: 20, qty: 2 }];
    const notationFor = (bag: Record<number, number>, modifier: number, mode: RollMode) => !requestFor(bag, mode).length ? '' : requestFor(bag, mode).map(group => group.qty + 'd' + group.sides).join(' + ') + (modifier ? modifier > 0 ? ' + ' + modifier : ' − ' + Math.abs(modifier) : '') + (mode === 'normal' ? '' : mode === 'advantage' ? '（优势）' : '（劣势）');
    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                setDrawer(null);
        };
        const changed = () => setFullscreen(document.fullscreenElement === studio.current);
        window.addEventListener('keydown', close);
        document.addEventListener('fullscreenchange', changed);
        return () => { window.removeEventListener('keydown', close); document.removeEventListener('fullscreenchange', changed); };
    }, []);
    useEffect(() => {
        let live = true;
        if (!pending.current) {
            pending.current = import('@3d-dice/dice-box').then(async ({ default: Box }) => {
                const probe = document.createElement('canvas');
                const gl = probe.getContext('webgl2') || probe.getContext('webgl');
                if (!gl)
                    throw new Error('WebGL unavailable');
                gl.getExtension('WEBGL_lose_context')?.loseContext();
                const box = new Box({ container: '#tabletop-dice-tray', id: 'tabletop-dice-canvas', assetPath: import.meta.env.BASE_URL + 'vendor/dice-box/', themeColor: '#a63d40', scale: 6, offscreen: false, enableShadows: true });
                instance.current = box;
                await withTimeout(box.init(), 20000);
                return box;
            });
        }
        pending.current.then(() => {
            if (live) {
                setReady(true);
                window.dispatchEvent(new Event('resize'));
            }
        }).catch(() => {
            if (live) {
                setError('3D 骰盘未能加载。可使用普通投骰继续。');
                setSimple(true);
            }
        });
        return () => { live = false; };
    }, []);
    useEffect(() => {
        if (active && ready)
            requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }, [active, ready]);
    const change = (side: number, amount: number) => setBag(old => {
        const current = Object.values(old).reduce((sum, n) => sum + n, 0);
        if (amount > 0 && current >= 20)
            return old;
        return { ...old, [side]: Math.max(0, Math.min(20, (old[side] || 0) + amount)) };
    });
    const roll = async (formula?: Formula) => {
        const rollingBag = formula?.bag || bag, rollingMode = formula?.mode || mode, rollingModifier = Math.max(-9999, Math.min(9999, Math.trunc(Number(formula?.modifier ?? modifier) || 0)));
        if (rolling.current || (!simple && !ready))
            return;
        const request = requestFor(rollingBag, rollingMode);
        const requestedCount = request.reduce((sum, group) => sum + group.qty, 0);
        if (requestedCount > 20) {
            setError('每轮最多20枚骰子，请减少数量。');
            return;
        }
        if (!simple && !refresh && tableCount + requestedCount > 100) {
            setError('桌面已接近100枚，请先清空骰盘再投掷。');
            return;
        }
        if (!request.length) {
            setError('请先选择至少一枚骰子。');
            return;
        }
        if (formula) {
            setBag(formula.bag);
            setModifier(rollingModifier);
            setMode(rollingMode);
        }
        rolling.current = true;
        setBusy(true);
        setError('');
        setDrawer(null);
        try {
            let dice: {
                sides: number;
                value: number;
            }[];
            if (simple)
                dice = request.flatMap(group => Array.from({ length: group.qty }, () => ({ sides: group.sides, value: randomDie(group.sides) })));
            else {
                // Collection results include only this round; getRollResults also includes retained dice.
                const result = await withTimeout(refresh ? instance.current!.roll(request) : instance.current!.add(request), 35000);
                dice = result.map(die => ({ sides: Number(die.sides), value: Number(die.value ?? die.result) }));
                if (dice.length !== request.reduce((n, g) => n + g.qty, 0) || dice.some(die => !Number.isInteger(die.value) || die.value < 1 || die.value > die.sides))
                    throw new Error('invalid result');
            }
            const base = rollingMode === 'normal' ? dice.reduce((sum, die) => sum + die.value, 0) : rollingMode === 'advantage' ? Math.max(...dice.map(die => die.value)) : Math.min(...dice.map(die => die.value));
            const notation = notationFor(Object.fromEntries(request.map(group => [group.sides, group.qty])), rollingModifier, 'normal');
            const record: RollRecord = { id: crypto.randomUUID(), notation, dice, modifier: rollingModifier, total: base + rollingModifier, mode: rollingMode, at: new Date().toISOString(), rendered: !simple };
            if (!simple)
                setTableCount(old => refresh ? requestedCount : old + requestedCount);
            setHistory(previous => [record, ...(Array.isArray(previous) ? previous : [])].slice(0, 20));
        }
        catch {
            setSimple(true);
            setError('本次投骰未完成，没有记入结果。可切换普通投骰或重试。');
        }
        finally {
            rolling.current = false;
            setBusy(false);
        }
    };
    const latest = history[0];
    const currentNotation = notationFor(bag, modifier, mode);
    const clearTable = () => {
        if (busy)
            return;
        if (instance.current && ready)
            instance.current.clear();
        setTableCount(0);
    };
    const loadFormula = (formula: Formula) => {
        if (busy)
            return;
        setBag(formula.bag);
        setModifier(formula.modifier);
        setMode(formula.mode);
        setDrawer(null);
    };
    const saveFormula = () => {
        if (!requestFor(bag, mode).length) {
            setError('请先选择骰子再保存。');
            return;
        }
        const formula: Formula = { id: crypto.randomUUID(), name: formulaName.trim() || currentNotation, bag: { ...bag }, modifier, mode };
        setSaved(previous => [formula, ...(Array.isArray(previous) ? previous : [])]);
        setFormulaName('');
    };
    const toggleDrawer = (next: 'presets' | 'history') => {
        setRightTab(next);
        setDrawer(old => old === next ? null : next);
    };
    return <section ref={studio} className="dice-studio" aria-label="模拟骰盘">
     <div id="tabletop-dice-tray" className={'dice-tray' + (simple ? ' is-simple' : '')} aria-label="3D骰盘"><span className="dice-tray-watermark" aria-hidden="true">◆</span>{(!ready || simple) && <span className="dice-tray-status">{simple ? '普通投骰模式' : '正在准备 3D 骰盘…'}</span>}</div>
     <div className="dice-scene-header"><div><button type="button" disabled={busy} onClick={clearTable}>清空桌面</button>{typeof document.documentElement.requestFullscreen === 'function' && <button type="button" onClick={() => { (document.fullscreenElement ? document.exitFullscreen() : studio.current?.requestFullscreen())?.catch(() => setError('当前环境无法进入全屏。')); }}>{fullscreen ? '退出全屏' : '全屏'}</button>}</div></div>
     <div className="dice-edge-launchers"><div><button type="button" aria-expanded={drawer === 'presets'} aria-controls="dice-right-panel" onClick={() => toggleDrawer('presets')}>算式</button><button type="button" aria-expanded={drawer === 'history'} aria-controls="dice-right-panel" onClick={() => toggleDrawer('history')}>历史</button></div></div>
     {drawer && <button type="button" className="dice-panel-backdrop" aria-label="关闭侧栏" onClick={() => setDrawer(null)}/>}
     <div className="dice-palette" role="group" aria-label="直接选择骰子"><p className="dice-picker-hint" id="dice-picker-hint">点骰子添加</p><div className="dice-token-grid">{sides.map(side => <div className={'dice-token' + (bag[side] > 0 ? ' is-selected' : '')} key={side}><button type="button" className="dice-token-main" aria-describedby="dice-picker-hint" aria-label={'d' + side + '，已选' + (bag[side] || 0) + '枚。点击添加。'} disabled={busy || mode !== 'normal'} onClick={() => change(side, 1)} onContextMenu={event => {
                event.preventDefault();
                if (!busy && mode === 'normal')
                    change(side, -1);
            }} onKeyDown={event => {
                if (event.key === '-' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    if (!busy && mode === 'normal')
                        change(side, -1);
                }
            }}><DiePreview sides={side}/><span className="dice-token-label">d{side}</span></button><div className="dice-token-stepper"><button type="button" className="dice-token-minus" aria-label={'减少一枚d' + side} disabled={busy || mode !== 'normal' || !bag[side]} onClick={() => change(side, -1)}>−</button><span className="dice-token-count" aria-live="polite">{bag[side] || 0}</span><button type="button" aria-label={'增加一枚d' + side} disabled={busy || mode !== 'normal' || count >= 20} onClick={() => change(side, 1)}>＋</button></div></div>)}</div></div>

     <aside id="dice-right-panel" className={'dice-side-panel dice-right-panel' + (drawer === 'presets' || drawer === 'history' ? ' is-open' : '')}><header><nav aria-label="骰盘记录"><button type="button" aria-pressed={rightTab === 'presets'} onClick={() => {
            setRightTab('presets');
            if (drawer)
                setDrawer('presets');
        }}>算式</button><button type="button" aria-pressed={rightTab === 'history'} onClick={() => {
            setRightTab('history');
            if (drawer)
                setDrawer('history');
        }}>历史</button></nav><button type="button" className="dice-panel-close" onClick={() => setDrawer(null)}>关闭</button></header><div className="dice-panel-content"><details className="dice-roll-settings"><summary>投掷设置</summary><label className="dice-field">修正值<input type="number" min="-9999" max="9999" value={modifier} disabled={busy} onChange={e => setModifier(Math.max(-9999, Math.min(9999, Math.trunc(Number(e.target.value) || 0))))}/></label><label className="dice-field">投掷方式<select value={mode} disabled={busy} onChange={e => setMode(e.target.value as RollMode)}><option value="normal">普通组合</option><option value="advantage">优势 d20</option><option value="disadvantage">劣势 d20</option></select></label>{mode !== 'normal' && <p className="dice-panel-note">投两枚d20，{mode === 'advantage' ? '取高' : '取低'}后加修正。</p>}<label className="dice-setting"><input type="checkbox" checked={!!refresh} disabled={busy} onChange={e => setRefresh(e.target.checked)}/><span>每轮刷新骰盘<small>{refresh ? '新一轮移除上轮骰子' : '保留桌面骰子，追加本轮投掷'}</small></span></label><details className="dice-options"><summary>更多设置</summary><label className="dice-setting"><input type="checkbox" checked={simple} disabled={busy} onChange={e => setSimple(e.target.checked)}/>普通投骰</label><button type="button" disabled={busy} onClick={() => { setBag({}); setMode('normal'); }}>清空组合</button></details></details>{rightTab === 'presets' ? <><form className="dice-save-form" onSubmit={e => { e.preventDefault(); saveFormula(); }}><label>算式名称<input value={formulaName} maxLength={60} onChange={e => setFormulaName(e.target.value)} placeholder="例如：长剑伤害"/></label><p>{currentNotation || '先选择骰子'}</p><button type="submit" disabled={busy || !requestFor(bag, mode).length}>保存当前组合</button></form>{!formulas.length && <p className="dice-panel-note">保存常用组合，下次直接载入或投掷。</p>}{formulas.map(formula => <article className="dice-formula" key={formula.id}><h3>{formula.name}</h3><p>{notationFor(formula.bag, formula.modifier, formula.mode)}</p><div><button type="button" disabled={busy} onClick={() => loadFormula(formula)}>载入</button><button type="button" disabled={busy || (!simple && !ready)} onClick={() => roll(formula)}>投掷</button><button type="button" disabled={busy} aria-label={'删除算式' + formula.name} onClick={() => setSaved(previous => previous.filter(item => item.id !== formula.id))}>删除</button></div></article>)}</> : <><p className="dice-panel-note">最近20轮 · 每条只统计该轮骰子</p>{!history.length && <p>暂无记录。</p>}{history.map(record => <article className="dice-history-entry" key={record.id}><div><strong>{record.total}</strong><span>{record.notation}{record.mode !== 'normal' ? ' · ' + (record.mode === 'advantage' ? '优势' : '劣势') : ''}</span></div><p>{record.dice.map(die => 'd' + die.sides + ': ' + die.value).join(' · ')}</p><small>{record.rendered ? '3D骰盘' : '普通投骰'} · {new Date(record.at).toLocaleTimeString()}</small></article>)}</>}</div></aside>
     <div className="dice-scene-result" aria-live="polite">{busy ? <span>投掷中…</span> : latest ? <><strong>{latest.total}</strong><span>{latest.notation}{latest.mode !== 'normal' ? ' · ' + (latest.mode === 'advantage' ? '优势' : '劣势') : ''}</span></> : null}</div>
     <div className="dice-cast-bar"><button type="button" disabled={busy || !requestFor(bag, mode).length || (!simple && !ready)} onClick={() => roll()}>{busy ? '投掷中…' : '投掷'}</button></div>
     {error && <div className="dice-error" role="alert"><span>{error}</span><button type="button" onClick={() => setError('')}>关闭</button></div>}
    </section>;
}
