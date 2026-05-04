import React from 'react';

export default function LandingCtaSection() {
  return (
    <section
      id="manifesto"
      className="mx-auto max-w-screen-2xl border-y border-[var(--wv-outline-variant)]/30 bg-gradient-to-b from-white to-[var(--wv-surface)] px-6 py-32 text-center md:px-12"
    >
      <h2 className="mb-8 font-serif text-5xl italic text-[var(--wv-on-background)] md:text-6xl">
        Your Masterpiece Awaits.
      </h2>
      <p className="mx-auto mb-12 max-w-xl font-serif text-lg italic leading-relaxed text-[var(--wv-on-surface-variant)] md:text-xl">
        &quot;The most analytical storytelling tool I&apos;ve ever touched. It feels like an extension of my own
        mind.&quot;
        <br />
        <span className="mt-4 block font-serif text-base font-bold not-italic text-[var(--wv-primary)]">
          — Julian Thorne, Booker Prize Nominee
        </span>
      </p>
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
        <button
          type="button"
          className="rounded-full bg-[var(--wv-primary)] px-12 py-4 font-serif text-xl text-[var(--wv-on-primary)] shadow-lg transition-all hover:bg-[var(--wv-secondary)] active:scale-95"
        >
          Begin the Process
        </button>
        <button
          type="button"
          className="rounded-full border-2 border-[var(--wv-outline-variant)] px-12 py-4 font-serif text-xl text-[var(--wv-on-background)] transition-all hover:bg-[var(--wv-surface)] active:scale-95"
        >
          Read the Manifesto
        </button>
      </div>
    </section>
  );
}
