import React, { useCallback, useState } from 'react';
import { TOKEN_INTEL_KEYWORDS } from './tokenIntelKeywords';
import TokenKeywordInsight from './TokenKeywordInsight';

const chipClass =
  'flex items-center gap-2 rounded border border-[var(--wv-outline-variant)] bg-[var(--wv-surface-container-high)] px-3 py-1 transition-all hover:-translate-y-0.5 hover:shadow-md';

export default function TokenizedIntelligenceSection() {
  const [a, b, c] = TOKEN_INTEL_KEYWORDS;
  const [openKeywordId, setOpenKeywordId] = useState(null);

  const open = useCallback((id) => setOpenKeywordId(id), []);
  const close = useCallback(() => setOpenKeywordId(null), []);

  return (
    <section id="intelligence" className="mx-auto max-w-screen-2xl px-6 py-24 md:px-12">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="mb-6 font-serif text-4xl italic text-[var(--wv-on-background)]">
            Tokenized Intelligence
          </h2>
          <p className="font-serif text-lg leading-relaxed text-[var(--wv-on-surface-variant)] md:text-xl">
            Writerverse doesn&apos;t just read your text; it atomizes it. Every word is categorized into systemic
            variables—character motives, thematic weight, and world-building consistency.
          </p>
        </div>
        <div className="relative overflow-visible rounded-xl border border-[var(--wv-outline-variant)]/40 bg-white p-8 shadow-xl shadow-[var(--wv-primary)]/5">
          <div className="font-serif text-lg leading-relaxed text-[var(--wv-on-background)] md:text-xl">
            &quot;The{' '}
            <TokenKeywordInsight token={a} isOpen={openKeywordId === a.id} onOpen={open} onClose={close} /> returned with broken bones to{' '}
            <TokenKeywordInsight token={b} isOpen={openKeywordId === b.id} onOpen={open} onClose={close} /> carrying his ancestor&apos;s{' '}
            <TokenKeywordInsight token={c} isOpen={openKeywordId === c.id} onOpen={open} onClose={close} />
            .&quot;
          </div>
          <p className="mt-3 text-[11px] text-[var(--wv-on-surface-variant)]/70 md:hidden">
            Tap a highlighted phrase to see where it links in your workspace.
          </p>
          <p className="mt-3 hidden text-[11px] text-[var(--wv-on-surface-variant)]/70 md:block">
            Hover a highlighted phrase to see arcs, ideas, and graph links.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className={chipClass}>
              <span className="h-2 w-2 rounded-full bg-[var(--wv-tone-character)]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--wv-on-surface-variant)]">
                Protagonist
              </span>
            </div>
            <div className={chipClass}>
              <span className="h-2 w-2 rounded-full bg-[var(--wv-tone-world)]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--wv-on-surface-variant)]">
                Primary Hub
              </span>
            </div>
            <div className={chipClass}>
              <span className="h-2 w-2 rounded-full bg-[var(--wv-tone-plot)]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--wv-on-surface-variant)]">
                MacGuffin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
