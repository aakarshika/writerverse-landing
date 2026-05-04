import React from 'react';

function findAllOccurrences(text, sub) {
  const out = [];
  if (!sub || sub.length === 0 || !text) return out;
  let i = 0;
  while (i <= text.length - sub.length) {
    const j = text.indexOf(sub, i);
    if (j === -1) break;
    out.push([j, j + sub.length]);
    i = j + sub.length;
  }
  return out;
}

export function mergeBoldRanges(text, keywords) {
  const ranges = [];
  for (const kw of keywords || []) {
    for (const r of findAllOccurrences(text, kw)) ranges.push(r);
  }
  if (!ranges.length) return [];
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [s, e] of ranges) {
    const last = merged[merged.length - 1];
    if (!last || s > last[1]) merged.push([s, e]);
    else last[1] = Math.max(last[1], e);
  }
  return merged;
}

export function phraseToReactNodes(text, visibleLen, mergedRanges) {
  const L = Math.min(Math.max(0, visibleLen), text.length);
  if (L <= 0) return null;
  if (!mergedRanges?.length) return text.slice(0, L);

  const nodes = [];
  let i = 0;
  let k = 0;
  for (const [bs, be] of mergedRanges) {
    if (bs >= L) break;
    const end = Math.min(be, L);
    if (bs > i) {
      const plain = text.slice(i, Math.min(bs, L));
      if (plain) nodes.push(<span key={`p-${k++}`}>{plain}</span>);
    }
    const bstart = Math.max(bs, i);
    if (end > bstart) {
      nodes.push(
        <strong
          key={`b-${k++}`}
          className="font-bold not-italic text-[var(--wv-on-surface)]"
        >
          {text.slice(bstart, end)}
        </strong>,
      );
    }
    i = Math.max(i, end);
    if (i >= L) break;
  }
  if (i < L) {
    const tail = text.slice(i, L);
    if (tail) nodes.push(<span key={`p-${k++}`}>{tail}</span>);
  }
  return nodes;
}
