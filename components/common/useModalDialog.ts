import { useEffect, type RefObject } from 'react';
const locks = new WeakMap<HTMLElement,{ count:number; overflow:string }>();
/** Shared modal lifetime: nested scroll locks and focus restoration, no application state. */
export function useModalDialog(ref:RefObject<HTMLDialogElement>, active=true) {
    useEffect(()=>{
        const dialog=ref.current;
        if(!active || !dialog) return;
        const previous=document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const roots=Array.from(document.querySelectorAll<HTMLElement>('.app-main,.folio-pages,.resource-catalog,.favorites-workspace,.rules-catalog,.information-workspace'));
        roots.forEach(root=>{const lock=locks.get(root); if(lock) lock.count++; else { locks.set(root,{count:1,overflow:root.style.overflow}); root.style.overflow='hidden'; }});
        if(!dialog.open) dialog.showModal();
        return ()=>{
            if(dialog.open) dialog.close();
            roots.forEach(root=>{const lock=locks.get(root); if(lock && --lock.count===0) {root.style.overflow=lock.overflow;locks.delete(root);} });
            const open=Array.from(document.querySelectorAll<HTMLDialogElement>('dialog[open]')).at(-1);
            if(previous?.isConnected && !previous.closest('[hidden]') && (!open || open.contains(previous))) previous.focus({preventScroll:true});
        };
    },[ref,active]);
}
