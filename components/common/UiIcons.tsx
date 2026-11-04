import React from 'react';
import { AssetIcon } from './AssetIcon';
type Props = Omit<React.SVGProps<SVGSVGElement>, 'name'> & {
    size?: number | string;
};
const icon = (name: string) => function UiIcon(props: Props) { return <AssetIcon {...props} name={'pixel/' + name}/>; };
export const Home = icon('home'), X = icon('close'), ChevronLeft = icon('left'), ChevronRight = icon('right'), Search = icon('search'), Edit2 = icon('edit'), Trash2 = icon('delete'), Plus = icon('add'), FileDown = icon('download'), FileUp = icon('upload'), Save = icon('save'), CheckCircle = icon('check'), ArrowLeft = icon('back'), PenTool = icon('edit'), Zap = icon('lightning'), Scale = icon('scale'), Star = icon('star'), User = icon('user'), Filter = icon('filter'), Menu = icon('menu');
