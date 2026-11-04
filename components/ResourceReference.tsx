import React, { createContext, useContext } from 'react';
export const ResourceReferenceContext = createContext<((value: {
    tag: string;
    name: string;
    source: string;
}) => void) | null>(null);
export function ResourceReference({ target, label }: {
    target: string;
    label: string;
}) {
    const open = useContext(ResourceReferenceContext);
    let reference: {
        tag: string;
        name: string;
        source: string;
    };
    try {
        reference = JSON.parse(decodeURIComponent(target));
    }
    catch {
        return <>{label}</>;
    }
    if (!open || !reference.tag || !reference.name || !reference.source)
        return <>{label}</>;
    return <button type="button" className="resource-inline-reference" onClick={() => open(reference)} aria-label={'查阅：' + label}>{label}</button>;
}
