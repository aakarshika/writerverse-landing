import React from 'react';

const navLinkClass =
  'font-serif text-lg tracking-tight transition-colors duration-300 hover:text-[var(--wv-primary)]';

export default function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--wv-outline-variant)]/30 bg-[var(--wv-surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-6 md:px-12">
        <div className="font-serif text-2xl font-semibold italic text-[var(--wv-primary)]">Writerverse</div>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#process" className={`font-medium text-[var(--wv-primary)] ${navLinkClass}`}>
            Process
          </a>
          <a href="#manifesto" className={`text-[var(--wv-on-surface-variant)] ${navLinkClass}`}>
            Manifesto
          </a>
          <a href="#intelligence" className={`text-[var(--wv-on-surface-variant)] ${navLinkClass}`}>
            Intelligence
          </a>
          <a href="#pricing" className={`text-[var(--wv-on-surface-variant)] ${navLinkClass}`}>
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            className="font-serif text-base tracking-tight text-[var(--wv-on-surface-variant)] transition-colors duration-300 hover:text-[var(--wv-primary)] md:text-lg"
          >
            Log In
          </button>
          <button
            type="button"
            className="rounded-lg bg-[var(--wv-primary)] px-5 py-2 font-serif text-base tracking-tight text-[var(--wv-on-primary)] shadow-sm transition-colors duration-300 hover:bg-[var(--wv-secondary)] active:scale-95 md:px-6 md:text-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
