import React from 'react';

const MEMORY_ROWS = [
  { name: 'Ancient Blade', whisper: 'stolen before the solstice', dim: false },
  { name: 'Prince Kael', whisper: 'the heir who still flinches at steel', dim: false },
  { name: 'Oakhaven Ruins', whisper: 'where the guild left their mark', dim: true },
];

export default function EditorsCanvasSection() {
  return (
    <section className="mx-auto max-w-screen-2xl overflow-hidden px-6 py-32 md:px-12">
      <p className="mb-4 font-serif text-sm italic tracking-wide text-[var(--wv-on-surface-variant)]/80 md:mb-6">
        Where the page listens back
      </p>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="relative rounded-2xl border border-[var(--wv-outline-variant)] bg-white p-8 shadow-xl shadow-[var(--wv-primary)]/5 md:p-12 lg:col-span-2">
          <div className="absolute bottom-12 left-0 top-12 w-1.5 rounded-full bg-gradient-to-b from-[var(--wv-primary)]/90 via-[var(--wv-primary)]/40 to-[var(--wv-primary)]/10" />
          <h3 className="mb-2 font-serif text-3xl italic text-[var(--wv-on-background)]">The Editor&apos;s Canvas</h3>
          <p className="mb-8 max-w-prose font-serif text-sm leading-relaxed text-[var(--wv-on-surface-variant)]">
            Your draft stays yours; the engine only remembers what you&apos;ve already whispered into the world.
          </p>
          <div className="relative font-serif text-lg leading-loose text-[var(--wv-on-background)] md:text-xl">
            His fingers found the{' '}
            <span className="cursor-pointer border-b-2 border-dashed border-[var(--wv-primary)]/45 font-medium text-[var(--wv-primary)] transition-colors hover:bg-[var(--wv-primary)]/5">
              ancient blade
            </span>
            —cold runes, a pulse that matched his breath, the weight of a line that had waited seven reigns to be
            broken.

            <aside
              className="mt-8 rounded-2xl border border-[var(--wv-primary)]/20 bg-gradient-to-br from-[var(--wv-primary)]/[0.06] via-[var(--wv-surface-container-low)] to-[var(--wv-surface-container)] p-6 shadow-sm ring-1 ring-[var(--wv-primary)]/5 transition-shadow hover:shadow-md"
              aria-label="Assistant guidance from story memory"
            >
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined shrink-0 text-[var(--wv-primary)]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  aria-hidden
                >
                  auto_awesome
                </span>
                <div>
                  <p className="mb-2 font-serif text-[13px] italic text-[var(--wv-primary)]">
                    Something your manuscript already knows
                  </p>
                  <p className="text-[15px] leading-relaxed text-[var(--wv-on-surface-variant)]">
                    In the vault scene you gave the Guild the real blade—so this moment can&apos;t be the heirloom
                    unchanged. Does he close on the forgery, the empty sheath, or a truth he isn&apos;t ready to name?
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-[var(--wv-outline-variant)] bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--wv-primary)]/10 shadow-inner">
                <span className="material-symbols-outlined text-[var(--wv-primary)]">psychology</span>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[var(--wv-on-background)]">The assistant engine</h4>
                <p className="mt-0.5 font-serif text-xs italic text-[var(--wv-on-surface-variant)]/85">
                  Memory-guided, not memory-replacing
                </p>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--wv-on-surface-variant)]">
              It walks beside your plot like a reader who never forgets a promise—continuity as intuition, not a
              checklist. Lore, voice, and consequence stay threaded through the draft until the world feels inevitable.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--wv-outline-variant)] bg-[var(--wv-surface-variant)]/40 p-8">
            <h4 className="mb-1 font-serif text-sm italic text-[var(--wv-on-surface)]">What it&apos;s holding for you</h4>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-[var(--wv-on-surface-variant)]/55">
              Living threads in active memory
            </p>
            <ul className="space-y-5">
              {MEMORY_ROWS.map((row) => (
                <li
                  key={row.name}
                  className={`border-b border-[var(--wv-outline-variant)]/35 pb-4 last:border-0 last:pb-0 ${row.dim ? 'opacity-55' : ''}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-[var(--wv-on-surface)]">{row.name}</span>
                    <span className="font-serif text-[13px] italic leading-snug text-[var(--wv-on-surface-variant)]/90">
                      {row.whisper}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
