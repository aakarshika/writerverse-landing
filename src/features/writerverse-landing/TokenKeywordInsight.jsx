import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const GAP = 10;
/** 0 = only defer to next macrotask so pointer can enter the portaled popover before close. */
const CLOSE_DELAY_MS = 0;
const VIEW_PAD = 8;

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function computePosition(anchorEl, popoverEl) {
  if (!anchorEl) return null;
  const ar = anchorEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const popW = Math.min(320, vw - VIEW_PAD * 2);
  const estH = popoverEl?.offsetHeight || 260;

  let left = ar.left + ar.width / 2 - popW / 2;
  left = clamp(left, VIEW_PAD, vw - popW - VIEW_PAD);

  let placement = 'below';
  let top = ar.bottom + GAP;
  if (top + estH > vh - VIEW_PAD && ar.top - GAP - estH > VIEW_PAD) {
    placement = 'above';
    top = ar.top - GAP - estH;
  }
  if (top + estH > vh - VIEW_PAD) {
    top = clamp(top, VIEW_PAD, Math.max(VIEW_PAD, vh - estH - VIEW_PAD));
  }

  return { top, left, width: popW, placement };
}

export default function TokenKeywordInsight({ token, isOpen, onOpen, onClose }) {
  const rootRef = useRef(null);
  const anchorRef = useRef(null);
  const popoverRef = useRef(null);
  const panelId = useId();
  const closeTimerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 320, placement: 'below' });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, onClose]);

  const updatePosition = useCallback(() => {
    if (!isOpen || !anchorRef.current) return;
    const next = computePosition(anchorRef.current, popoverRef.current);
    if (next) setCoords(next);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;
    updatePosition();
    const raf1 = requestAnimationFrame(() => updatePosition());
    const raf2 = requestAnimationFrame(() => updatePosition());

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => updatePosition()) : null;
    if (anchorRef.current) ro?.observe(anchorRef.current);
    if (popoverRef.current) ro?.observe(popoverRef.current);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro?.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition, token.id]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        clearCloseTimer();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, clearCloseTimer]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onDoc = (e) => {
      if (anchorRef.current?.contains(e.target)) return;
      if (popoverRef.current?.contains(e.target)) return;
      clearCloseTimer();
      onClose();
    };
    document.addEventListener('pointerdown', onDoc, true);
    return () => document.removeEventListener('pointerdown', onDoc, true);
  }, [isOpen, onClose, clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleAnchorEnter = useCallback(() => {
    clearCloseTimer();
    onOpen(token.id);
  }, [clearCloseTimer, onOpen, token.id]);

  const handleAnchorLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const handlePopoverEnter = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const handlePopoverLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  const tone = token.tone;

  const panel =
    isOpen &&
    createPortal(
      <motion.div
        key={token.id}
        ref={popoverRef}
        id={panelId}
        role="region"
        aria-label={`Details for ${token.label}`}
        data-wv-tone={tone}
        className="writerverse-landing  pointer-events-auto rounded-xl border p-4 text-left"
        style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          width: coords.width,
          zIndex: 9999,
          backgroundColor: 'white'
        }}
        initial={{ opacity: 0, y: coords.placement === 'above' ? 8 : -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0 }}
        onPointerEnter={handlePopoverEnter}
        onPointerLeave={handlePopoverLeave}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-3">
          {token.links.map((link) => (
            <li
              key={`${token.id}-${link.title}`}
              data-wv-tone={tone}
              className="wv-tone-token-card-accent rounded-lg border border-[var(--wv-outline-variant)]/45 bg-[var(--wv-surface-container-low)]/90 p-3"
            >
              <span
                data-wv-tone={tone}
                className="wv-tone-token-badge mb-1.5 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              >
                {link.badge}
              </span>
              <p className="font-serif text-sm font-semibold text-[var(--wv-on-background)]">{link.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--wv-on-surface-variant)]">{link.summary}</p>
            </li>
          ))}
        </ul>
      </motion.div>,
      document.body,
    );

  return (
    <span ref={rootRef} className="relative inline-block align-baseline">
      <button
        ref={anchorRef}
        type="button"
        data-wv-tone={tone}
        className="wv-tone-token-trigger cursor-pointer rounded border-b-2 border-transparent px-1 font-medium transition-[filter] hover:brightness-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wv-outline-variant)] focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onPointerEnter={handleAnchorEnter}
        onPointerLeave={handleAnchorLeave}
        onFocus={() => handleAnchorEnter()}
        onClick={(e) => {
          e.preventDefault();
          clearCloseTimer();
          if (isOpen) onClose();
          else onOpen(token.id);
        }}
      >
        {token.label}
      </button>

      {panel}
    </span>
  );
}
