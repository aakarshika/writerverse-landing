import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SLIDING_PHRASE_SURFACE_CLASS,
  TYPING_PHRASE_SURFACE_CLASS,
} from './heroConstants';
import { phraseDockCenterDy } from './heroTreeLayout';
import { RichPhraseLine } from './heroPhrase';

function phraseFlyEndpoints(layout, targetId, stackIndex, heroRef, treeZoneRef) {
  const heroEl = heroRef.current;
  const treeEl = treeZoneRef.current;
  if (!heroEl || !treeEl) return null;
  const sp = layout.nodes.story;
  const tp = layout.nodes[targetId];
  if (!sp || !tp) return null;
  const heroRect = heroEl.getBoundingClientRect();
  const treeRect = treeEl.getBoundingClientRect();
  const ox = treeRect.left - heroRect.left;
  const oy = treeRect.top - heroRect.top;
  return {
    from: {
      x: ox + sp.x,
      y: oy + sp.y + phraseDockCenterDy('story', 0),
    },
    to: {
      x: ox + tp.x,
      y: oy + tp.y + phraseDockCenterDy(targetId, stackIndex),
    },
  };
}

function TypingAtStoryCard({ item, onTypingPhaseComplete }) {
  const [shown, setShown] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const text = item.text;
    const totalMs = item.typingMs;
    const pauseMs = item.pauseAfterTypingMs ?? 0;
    const n = text.length;
    doneRef.current = false;
    let disposed = false;
    let dwellTimer = null;

    if (n === 0) {
      doneRef.current = true;
      onTypingPhaseComplete(item);
      return undefined;
    }

    const t0 = performance.now();
    let raf = 0;

    const finishTyping = () => {
      if (disposed || doneRef.current) return;
      doneRef.current = true;
      onTypingPhaseComplete(item);
    };

    const step = (now) => {
      if (disposed) return;
      const u = Math.min(1, (now - t0) / totalMs);
      const next = Math.max(0, Math.min(n, Math.ceil(u * n)));
      setShown(next);
      if (u >= 1) {
        setShown(n);
        if (pauseMs > 0) {
          dwellTimer = window.setTimeout(finishTyping, pauseMs);
        } else {
          finishTyping();
        }
        return;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [item, onTypingPhaseComplete]);

  return (
    <motion.div
      layout={false}
      className="absolute z-40"
      style={{ left: item.storyPoint.x, top: item.storyPoint.y }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className={TYPING_PHRASE_SURFACE_CLASS}>
          <RichPhraseLine
            text={item.text}
            visibleLen={shown}
            keywords={item.keywords}
            className="whitespace-pre-wrap"
          />
          {shown < item.text.length ? (
            <span
              className="ml-px inline-block min-h-[1em] w-0.5 translate-y-px animate-pulse bg-[var(--wv-primary)]/70 align-middle"
              aria-hidden
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function SlidingPhraseCard({ item, layout, heroRef, treeZoneRef, onDone }) {
  const ends = phraseFlyEndpoints(layout, item.targetId, item.stackIndex, heroRef, treeZoneRef);
  const finishedRef = useRef(false);

  useEffect(() => {
    finishedRef.current = false;
  }, [item.id]);

  if (!ends) return null;

  const handleComplete = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onDone(item);
  };

  return (
    <motion.div
      layout={false}
      className="absolute z-40"
      initial={{ left: ends.from.x, top: ends.from.y, opacity: 1 }}
      animate={{ left: ends.to.x, top: ends.to.y, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: item.slideDuration, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={handleComplete}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className={SLIDING_PHRASE_SURFACE_CLASS}>
          <RichPhraseLine
            text={item.text}
            visibleLen={item.text.length}
            keywords={item.keywords}
            className="whitespace-normal"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function HeroFlyingLayer({
  flying,
  layout,
  heroRef,
  treeZoneRef,
  zoneSize,
  onTypingPhaseComplete,
  onJourneyComplete,
}) {
  const ready = zoneSize.w > 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-visible">
      <AnimatePresence>
        {ready &&
          flying.map((item) =>
            item.phase === 'typing' ? (
              <TypingAtStoryCard key={item.id} item={item} onTypingPhaseComplete={onTypingPhaseComplete} />
            ) : (
              <SlidingPhraseCard
                key={`${item.id}-slide`}
                item={item}
                layout={layout}
                heroRef={heroRef}
                treeZoneRef={treeZoneRef}
                onDone={onJourneyComplete}
              />
            ),
          )}
      </AnimatePresence>
    </div>
  );
}
