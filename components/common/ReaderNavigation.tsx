import type { ReactNode } from 'react';

/** Navigation always follows the caller's current filtered sequence. */
export function ReaderNavigation({ index, count, onPrevious, onNext, children }: {
    index: number;
    count: number;
    onPrevious: () => void;
    onNext: () => void;
    children?: ReactNode;
}) {
    return <div className={'shared-reader-navigation' + (children ? ' has-action' : '')}>
      <button type="button" data-reader-previous aria-label="上一张，向右滑动" disabled={index <= 0} onClick={onPrevious}>←</button>
      {children}
      <button type="button" data-reader-next aria-label="下一张，向左滑动" disabled={index < 0 || index >= count - 1} onClick={onNext}>→</button>
    </div>;
}
