import React from 'react';

const linkClass =
  'font-serif text-sm uppercase tracking-widest text-[var(--wv-on-surface-variant)] transition-colors hover:text-[var(--wv-primary)]';

export default function LandingFooter() {
  return (
    <footer id="pricing" className="border-t border-[var(--wv-outline-variant)]/30 bg-[var(--wv-surface)] py-24">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 md:grid-cols-4 md:px-12">
        <div>
          <div className="mb-6 font-serif text-2xl font-bold text-[var(--wv-primary)]">Writerverse</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--wv-on-surface-variant)]/60">
            © 2026 Writerverse. From Chaos to Story.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--wv-on-background)]">Product</h5>
          <a href="#process" className={linkClass}>
            Process
          </a>
          <a href="#intelligence" className={linkClass}>
            Intelligence
          </a>
          <a href="#pricing" className={linkClass}>
            Pricing
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--wv-on-background)]">Resources</h5>
          <a href="#manifesto" className={linkClass}>
            Manifesto
          </a>
          <a href="#" className={linkClass}>
            Documentation
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--wv-on-background)]">Legal</h5>
          <a href="#" className={linkClass}>
            Privacy
          </a>
          <a href="#" className={linkClass}>
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
