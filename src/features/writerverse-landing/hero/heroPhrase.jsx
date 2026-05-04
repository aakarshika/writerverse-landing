import React, { useMemo } from 'react';
import { mergeBoldRanges, phraseToReactNodes } from './heroPhraseUtils';

export function RichPhraseLine({ text, visibleLen, keywords, className }) {
  const merged = useMemo(() => mergeBoldRanges(text, keywords), [text, keywords]);
  return <span className={className}>{phraseToReactNodes(text, visibleLen, merged)}</span>;
}
