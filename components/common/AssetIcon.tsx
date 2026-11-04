import React from 'react';
import catalog from '../../src/assets/icon-catalog.json';
type Props = React.SVGProps<SVGSVGElement> & {
    name: string;
    size?: number | string;
};
// The markup is generated from pinned, locally stored SVGs; no user input is inserted.
export function AssetIcon({ name, size = 24, className = '', ...props }: Props) {
    const asset = (catalog as Record<string, {
        viewBox: string;
        body: string;
    }>)[name];
    if (!asset)
        return null;
    return <svg {...props} className={'asset-icon ' + className} width={size} height={size} viewBox={asset.viewBox} fill="currentColor" focusable="false" aria-hidden="true"><g dangerouslySetInnerHTML={{ __html: asset.body }}/></svg>;
}
