import React from 'react';

const BEATS = [
  {
    id: '01',
    label: 'BEAT 01',
    title: 'The Return',
    body: 'The prince steps onto the ash-covered docks, realizing the city he loved is gone.',
    highlight: false,
  },
  {
    id: '02',
    label: 'BEAT 02',
    title: 'False Sanctuary',
    body: 'Seeking refuge in the old temple, he finds only ghosts and a warning.',
    highlight: false,
  },
  {
    id: '03',
    label: 'BEAT 03 (CLIMAX)',
    title: 'The Reckoning',
    body: 'The usurper is met on the bridge. The broken crown begins to glow with ancient heat.',
    highlight: true,
  },
  {
    id: '04',
    label: 'BEAT 04',
    title: 'The Aftermath',
    body: 'A silent coronation under a dark sky. The weight of the crown is literal.',
    highlight: false,
  },
];

const cardBase =
  'min-w-[300px] cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition-all group';

export default function NarrativeArcSection() {
  return (
    <section id="process" className="bg-[var(--wv-surface-container-lowest)] py-24">
      <div className="mx-auto mb-12 max-w-screen-2xl px-6 md:px-12">
        <h2 className="font-serif text-4xl italic text-[var(--wv-on-background)]">Narrative Arc Control</h2>
      </div>

      <div className="relative mb-8 h-48 px-6 md:px-12">
        <svg className="h-full w-full" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="wv-arc-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="var(--wv-primary)" stopOpacity={1} />
              <stop offset="50%" stopColor="var(--wv-error)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--wv-primary)" stopOpacity={1} />
            </linearGradient>
          </defs>
          <path
            d="M0 150 Q 150 140, 300 120 T 600 50 T 900 100 T 1200 160"
            fill="none"
            stroke="url(#wv-arc-gradient)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <circle
            className="drop-shadow-[0_0_8px_rgba(186,26,26,0.4)]"
            cx="600"
            cy="50"
            r="8"
            fill="var(--wv-error)"
          />
        </svg>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border-2 border-[var(--wv-error)]/20 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--wv-error)] shadow-sm">
          Peak tension
        </div>
      </div>

      <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-8 md:px-12">
        {BEATS.map((b) => (
          <div
            key={b.id}
            className={
              b.highlight
                ? `${cardBase} border-2 border-[var(--wv-primary)] shadow-lg shadow-[var(--wv-primary)]/10 hover:scale-[1.02]`
                : `${cardBase} border-[var(--wv-outline-variant)] hover:border-[var(--wv-primary)]/30 hover:shadow-md`
            }
          >
            <span
              className={`mb-2 block text-[11px] font-bold uppercase tracking-wider ${
                b.highlight ? 'text-[var(--wv-primary)]' : 'text-[var(--wv-on-surface-variant)]/60'
              }`}
            >
              {b.label}
            </span>
            <h3 className="mb-4 font-serif text-2xl text-[var(--wv-on-background)]">{b.title}</h3>
            <p className="text-[15px] leading-relaxed text-[var(--wv-on-surface-variant)] opacity-0 transition-opacity group-hover:opacity-100">
              {b.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-12">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--wv-on-surface-variant)]">
            Narrative tension
          </span>
          <div className="relative h-2 w-full rounded-full bg-[var(--wv-outline-variant)]/30">
            <div className="absolute h-full w-[70%] rounded-full bg-[var(--wv-primary)]" />
            <div className="absolute left-[70%] top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--wv-primary)] bg-white shadow-md" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--wv-on-surface-variant)]">
            Emotional resonance
          </span>
          <div className="relative h-2 w-full rounded-full bg-[var(--wv-outline-variant)]/30">
            <div className="absolute h-full w-[40%] rounded-full bg-[var(--wv-secondary)]" />
            <div className="absolute left-[40%] top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--wv-secondary)] bg-white shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
