import { PersonalDataBackup } from './PersonalDataBackup';
import { CharacterBackup } from './character/CharacterBackup';
import { ThemeSettings } from './ThemeSettings';
import { createPortal } from 'react-dom';
import { DialogDismissButton, useDialogBackdrop } from './common/DialogControls';
import { useEffect, useRef, useState } from 'react';
import { ExternalResourceSources } from './ExternalResourceSources';
import { LocalResourceBundles } from './LocalResourceBundles';
import { useExternalLibrary } from '../contexts/ExternalResourceContext';

const sections = [
    { id: 'sources', label: '资料同步' },
    { id: 'backup', label: '本地备份' },
    { id: 'about', label: '关于与许可' },
] as const;

function SupportDialog({ onClose }: { onClose: () => void }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const backdrop = useDialogBackdrop(onClose);
    useEffect(() => { if (!dialog.current?.open) dialog.current?.showModal(); }, []);
    return createPortal(<dialog ref={dialog} className="support-dialog" aria-labelledby="support-heading" {...backdrop}
        onCancel={event => { event.preventDefault(); onClose(); }} onClose={onClose}>
        <header><h2 id="support-heading">支持作者</h2><DialogDismissButton onClick={onClose}/></header>
        <div className="support-codes">
            <figure><figcaption>支付宝</figcaption><img src={import.meta.env.BASE_URL + 'support/alipay.jpg'} alt="作者支付宝收款二维码"/></figure>
            <figure><figcaption>微信支付</figcaption><img src={import.meta.env.BASE_URL + 'support/wechat.png'} alt="作者微信支付收款二维码"/></figure>
        </div>
        <footer><a href="https://ifdian.net/a/nogubird" target="_blank" rel="noreferrer">前往爱发电 ↗</a></footer>
    </dialog>, document.body);
}

export function InformationWorkspace() {
    const external = useExternalLibrary();
    const [supportOpen, setSupportOpen] = useState(false);
    const [section, setSection] = useState<string>('sources');
    return <section className="app-workspace information-workspace" aria-label="信息与资料管理">
        <div className="information-topbar"><nav className="information-navigation" aria-label="信息分类">
            {sections.map(item => <button type="button" key={item.id} aria-pressed={section === item.id}
                aria-controls={'information-' + item.id} onClick={() => setSection(item.id)}>{item.label}</button>)}
        </nav><ThemeSettings/></div>
        <section id="information-sources" className="information-panel" hidden={section !== 'sources'} aria-label="资料同步">
            <ExternalResourceSources resources={external} />
        </section>
        <section id="information-backup" className="information-panel" hidden={section !== 'backup'} aria-label="本地备份">
            <CharacterBackup/><PersonalDataBackup/><LocalResourceBundles resources={external} />
        </section>
        <article id="information-about" className="information-panel information-about" hidden={section !== 'about'} aria-label="关于与许可">
            <section className="information-about-section">
                <h1>不咕鸟龙与地下城线下团辅助工具</h1>
                <p>不咕鸟（基德）制作。用于线下面团的资源查阅、角色整理和快速记录。</p>
                <p>本工具旨在对线下游戏进行辅助，并非自动计算完善的电子角色卡，如果您想要使用相应更为自动化的功能，请使用作者的另一款工具。</p>
                <div className="information-contacts">
                    <a href="https://nogubird.top/" target="_blank" rel="noreferrer"><small>俱乐部</small><span>成都本地线下面团秘密基地 TRPG 俱乐部 ↗</span></a>
                    <div><small>QQ群</small><span>261751459</span></div>
                    <button type="button" onClick={() => setSupportOpen(true)}><small>支持创作</small><span>支持作者 ♥</span></button>
                </div>
            </section>
            <section className="information-about-section">
                <h2>数据来源与使用说明</h2>
                <p><strong>数据来源</strong>　中文主库：<a href="https://github.com/tjliqy/5etools-cn/tree/cn2.0" target="_blank" rel="noreferrer">tjliqy/5etools-cn · cn2.0</a>；中文站：<a href="https://5e.kiwee.top/" target="_blank" rel="noreferrer">5e.kiwee.top</a>。具体出版物、文件和修订见卡片来源记录。</p>
                <p><strong>译文署名</strong>　中文源署名为Kiwee及贡献者；其许可文件注明译文来自民间汉化组与独立译者，由DND Common Library整理排版。</p>
                <p><strong>来源许可</strong>　中文源将代码及 data-bak/ 英文数据列为MIT，将 data/ 中文本地化数据列为CC BY-NC-SA 4.0（署名、非商业性使用、相同方式共享）。适用范围与条款见<a href={import.meta.env.BASE_URL + 'sources/5etools-cn-LICENSE.txt'} target="_blank" rel="noreferrer">来源许可原文</a>。Homebrew按各资料包的署名和许可处理。</p>
                <p><strong>工具范围</strong>　本工具提供资料下载、本地保存、解析和查阅功能。外部规则与译文并非本工具作者创作，相关权利归各权利人所有。本工具未对外部资料的准确性、完整性及权利状态作独立审核；解析显示也可能存在错误，使用时请核对原文。</p>
                <p><strong>使用与反馈</strong>　本项目禁止商业用途。下载、使用或传播外部资料，请遵守相应来源许可。资料内容或权利问题、解析显示错误，可通过上方QQ群联系作者，并提供具体条目和来源。支持作者为自愿支持工具开发，不提供外部资料的销售或授权。</p>
            </section><section className="information-about-section"><h2>素材与开源许可</h2><ul><li><a href={import.meta.env.BASE_URL + 'icons/ATTRIBUTION.html'} target="_blank" rel="noreferrer">Game-icons / Pixelarticons：作者与许可</a></li><li><a href="https://github.com/3d-dice/dice-box" target="_blank" rel="noreferrer">Dice-Box 1.1.4</a> · <a href={import.meta.env.BASE_URL + 'vendor/dice-box/LICENSE.txt'} target="_blank" rel="noreferrer">MIT许可</a></li><li><a href="https://chequered.ink/hi-res-dice-pack/" target="_blank" rel="noreferrer">骰型图：Chequered Ink · Hi Res Dice Pack</a> · <a href={import.meta.env.BASE_URL + 'dice/chequered-ink/LICENSE.txt'} target="_blank" rel="noreferrer">使用条款</a></li><li><a href="https://kenney.nl/assets/fantasy-ui-borders" target="_blank" rel="noreferrer">界面边框：Kenney · Fantasy UI Borders 1.0</a> · <a href={import.meta.env.BASE_URL + 'ui/kenney-fantasy/LICENSE.txt'} target="_blank" rel="noreferrer">CC0许可</a></li><li><a href="https://kenney.nl/assets/ui-pack-adventure" target="_blank" rel="noreferrer">明亮主题：Kenney · UI Pack – Adventure</a> · <a href={import.meta.env.BASE_URL + 'ui/kenney-adventure/LICENSE.txt'} target="_blank" rel="noreferrer">CC0许可</a></li><li>字体：Fusion Pixel。许可文件随本地字体保留。</li></ul></section>
        </article>
        {supportOpen && <SupportDialog onClose={() => setSupportOpen(false)}/>}
    </section>;
}
