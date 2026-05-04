import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CHAOS_FLOATING,
  EDGE_PATH_TRANSITION,
  EDGE_STROKE,
  NODE_DOT_TRANSITION,
  NODES_BY_ID,
  PARENT_OF,
  PHRASE_SEQUENCE,
} from './hero/heroConstants';
import {
  computeForVisible,
  dwellAfterTypingMs,
  phraseDockCenterDy,
  typingDurationMs,
} from './hero/heroTreeLayout';
import { RichPhraseLine } from './hero/heroPhrase';
import { HeroFlyingLayer } from './hero/HeroFlyingLayer';

function normalizeDockPhrase(entry) {
  if (typeof entry === 'string') return { text: entry, keywords: [] };
  return { text: entry.text, keywords: entry.keywords ?? [] };
}

function PhraseDockList({ nodeId, items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-1.5 flex max-w-[min(280px,72vw)] flex-col items-stretch gap-1">
      <AnimatePresence initial={false}>
        {items.map((raw, i) => {
          const { text, keywords } = normalizeDockPhrase(raw);
          return (
            <motion.li
              key={`${nodeId}-${i}-${text.slice(0, 32)}`}
              initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="rounded border border-[var(--wv-outline-variant)]/45 bg-[var(--wv-surface-container-low)] px-2.5 py-1.5 text-center font-serif text-[10px] italic leading-snug text-[var(--wv-on-surface-variant)] shadow-sm md:text-[11px]"
            >
              <RichPhraseLine
                text={text}
                visibleLen={text.length}
                keywords={keywords}
                className="whitespace-normal"
              />
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}

function TreeNode({ node, pos, isRoot, attached, hover }) {
  if (isRoot) {
    return (
      <motion.div
        className="absolute z-30"
        initial={false}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="flex min-w-0 flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--wv-primary)] text-[var(--wv-on-primary)] shadow-xl shadow-[var(--wv-primary)]/30">
              <motion.span
                className="material-symbols-outlined text-3xl"
                animate={hover ? { rotate: 360 } : { scale: [1, 1.08, 1] }}
                transition={
                  hover
                    ? { repeat: Infinity, duration: 4, ease: 'linear' }
                    : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }
                }
              >
                auto_fix_high
              </motion.span>
            </div>
            <div className="mt-2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--wv-primary)]/80">
              {hover ? 'Orchestrating…' : 'Story'}
            </div>
            <PhraseDockList nodeId="story" items={attached} />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute z-20"
      initial={false}
      animate={{ left: pos.x, top: pos.y }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 26,
            delay: 0.3,
          }}
        >
          <div className="flex min-w-0 flex-col items-center">
            <div
              data-wv-tone={node.tone}
              className="wv-tone-tree-pill whitespace-nowrap rounded-full border-2 border-[var(--wv-outline-variant)] bg-[var(--wv-surface)] px-3.5 py-1 font-serif text-[13px] font-bold shadow-sm"
            >
              {node.label}
            </div>
            <PhraseDockList nodeId={node.id} items={attached} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WriterverseHeroSection() {
  const heroRef = useRef(null);
  const treeZoneRef = useRef(null);

  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);

  const [visibleIds, setVisibleIds] = useState(() => new Set(['story']));
  const [attached, setAttached] = useState({});
  const [flying, setFlying] = useState([]);
  const [zoneSize, setZoneSize] = useState({ w: 0, h: 0 });

  const sequenceIndexRef = useRef(0);
  const idSeq = useRef(0);
  const seenArrivalsRef = useRef(new Set());
  const spawnNextRef = useRef(null);
  const tickRef = useRef(null);
  const journeyFollowUpRef = useRef(null);
  const mountedRef = useRef(true);
  const attachedRef = useRef(attached);
  const flyingRef = useRef([]);
  /** In-flight count per node so dock slots do not overlap when spawn gap < travel time. */
  const inboundByTargetRef = useRef({});

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    attachedRef.current = attached;
    flyingRef.current = flying;
    hoverRef.current = hover;
  }, [attached, flying, hover]);

  useLayoutEffect(() => {
    function measure() {
      const rect = treeZoneRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0) setZoneSize({ w: rect.width, h: rect.height });
    }
    measure();
    window.addEventListener('resize', measure);
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && treeZoneRef.current) ro.observe(treeZoneRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, []);

  const layout = useMemo(() => {
    if (zoneSize.w === 0) return { nodes: {}, edges: [] };
    return computeForVisible(visibleIds, zoneSize.w, zoneSize.h);
  }, [visibleIds, zoneSize.w, zoneSize.h]);

  const spawnNext = useCallback(() => {
    if (zoneSize.w === 0 || !heroRef.current || !treeZoneRef.current) return false;
    if (flyingRef.current.length > 0) return false;

    const idx = sequenceIndexRef.current;
    if (idx >= PHRASE_SEQUENCE.length) return false;

    const seq = PHRASE_SEQUENCE[idx];

    const newVisible = new Set(visibleIds);
    let cur = seq.targetId;
    while (cur) {
      newVisible.add(cur);
      cur = PARENT_OF[cur];
    }
    const layoutExpanded = newVisible.size !== visibleIds.size;

    const targetLayout = computeForVisible(newVisible, zoneSize.w, zoneSize.h);
    const targetPos = targetLayout.nodes[seq.targetId];
    const storyPos = layout.nodes.story;
    if (!targetPos || !storyPos) return false;

    sequenceIndexRef.current = idx + 1;

    const heroRect = heroRef.current.getBoundingClientRect();
    const treeRect = treeZoneRef.current.getBoundingClientRect();
    const offX = treeRect.left - heroRect.left;
    const offY = treeRect.top - heroRect.top;

    const id = ++idSeq.current;
    const fast = hoverRef.current;
    const typingMs = typingDurationMs(seq.text, fast);
    const slideDuration = fast ? 0.48 + Math.random() * 0.18 : 0.92 + Math.random() * 0.28;
    const pauseAfterTypingMs = dwellAfterTypingMs(fast);

    const tid = seq.targetId;
    const landed = attachedRef.current[tid]?.length ?? 0;
    const inbound = inboundByTargetRef.current[tid] ?? 0;
    const stackIndex = landed + inbound;
    inboundByTargetRef.current[tid] = inbound + 1;

    const dockDyStory = phraseDockCenterDy('story', 0);
    const storyPoint = {
      x: offX + storyPos.x,
      y: offY + storyPos.y + dockDyStory,
    };

    const flyPayload = {
      id,
      phase: 'typing',
      targetId: tid,
      text: seq.text,
      keywords: seq.keywords ?? [],
      storyPoint,
      typingMs,
      pauseAfterTypingMs,
      slideDuration,
      stackIndex,
      layoutExpanded,
      newVisibleIds: [...newVisible],
    };

    setFlying((prev) => [...prev, flyPayload]);
    return true;
  }, [zoneSize.w, zoneSize.h, visibleIds, layout]);

  useEffect(() => {
    spawnNextRef.current = spawnNext;
  }, [spawnNext]);

  const onTypingPhaseComplete = useCallback((item) => {
    if (item.layoutExpanded) {
      setVisibleIds(new Set(item.newVisibleIds));
    }
    setFlying((prev) => {
      const cur = prev.find((f) => f.id === item.id);
      if (!cur || cur.phase !== 'typing') return prev;
      return prev.map((f) => (f.id === item.id ? { ...f, phase: 'sliding' } : f));
    });
  }, []);

  const onJourneyComplete = useCallback((item) => {
    if (seenArrivalsRef.current.has(item.id)) return;
    seenArrivalsRef.current.add(item.id);
    const tid = item.targetId;
    inboundByTargetRef.current[tid] = Math.max(0, (inboundByTargetRef.current[tid] ?? 1) - 1);

    setFlying((prev) => prev.filter((f) => f.id !== item.id));
    setAttached((prev) => {
      const entry = { text: item.text, keywords: item.keywords ?? [] };
      const list = [...(prev[tid] || []), entry].slice(-3);
      return { ...prev, [tid]: list };
    });

    const gap = hoverRef.current ? 680 + Math.random() * 260 : 2200 + Math.random() * 600;
    if (journeyFollowUpRef.current) clearTimeout(journeyFollowUpRef.current);
    journeyFollowUpRef.current = window.setTimeout(() => {
      journeyFollowUpRef.current = null;
      if (!mountedRef.current) return;
      tickRef.current?.();
    }, gap);
  }, []);

  useEffect(() => {
    if (zoneSize.w === 0) return undefined;
    let cancelled = false;
    let timerId = null;

    const tick = () => {
      if (cancelled) return;
      const ok = spawnNextRef.current?.();
      if (!ok) {
        if (flyingRef.current.length > 0) return;
        const holdMs = hoverRef.current ? 3500 : 6000;
        timerId = window.setTimeout(() => {
          if (cancelled) return;
          if (journeyFollowUpRef.current) {
            clearTimeout(journeyFollowUpRef.current);
            journeyFollowUpRef.current = null;
          }
          sequenceIndexRef.current = 0;
          seenArrivalsRef.current = new Set();
          inboundByTargetRef.current = {};
          setVisibleIds(new Set(['story']));
          setAttached({});
          setFlying([]);
          timerId = window.setTimeout(tick, 800);
        }, holdMs);
        return;
      }
    };

    tickRef.current = tick;
    timerId = window.setTimeout(tick, 600);
    return () => {
      cancelled = true;
      tickRef.current = null;
      if (timerId) clearTimeout(timerId);
      if (journeyFollowUpRef.current) {
        clearTimeout(journeyFollowUpRef.current);
        journeyFollowUpRef.current = null;
      }
    };
  }, [zoneSize.w, zoneSize.h]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 pb-16 pt-6 md:px-10 md:pb-20 md:pt-10"
    >
      <div className="pointer-events-none absolute inset-0 hero-noise" />

      <div className="relative z-10 mx-auto grid h-full max-w-screen-2xl grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(320px,1fr)_minmax(0,1.5fr)] lg:gap-10">
        <div className="flex flex-col justify-center py-8 lg:py-0 lg:pl-6 lg:pr-2">
          <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--wv-primary)]">
            For narrative architects
          </span>
          <h1 className="mb-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl xl:text-[80px]">
            From Chaos
            <br />
            to Story.
          </h1>
          <p className="mb-8 max-w-md font-serif text-lg leading-relaxed text-[var(--wv-on-surface-variant)] md:text-xl">
            The analytical suite that watches your unformed ideas snap into structural brilliance.
            A silent, AI-driven orchestrator finds the shape inside the mess.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg bg-[var(--wv-primary)] px-6 py-3 font-serif text-base text-[var(--wv-on-primary)] shadow-md transition-colors duration-300 hover:bg-[var(--wv-secondary)] active:scale-95"
            >
              Begin Orchestrating
            </button>
            <button
              type="button"
              className="rounded-lg border border-[var(--wv-outline-variant)] px-6 py-3 font-serif text-base text-[var(--wv-on-surface-variant)] transition-colors duration-300 hover:border-[var(--wv-primary)]/60 hover:text-[var(--wv-primary)] active:scale-95"
            >
              See it in motion
            </button>
          </div>
          <p className="mt-8 max-w-sm text-[11px] uppercase tracking-[0.18em] text-[var(--wv-on-surface-variant)]/60">
            Hover the tree → lines type in at Story, then settle on the graph.
          </p>
        </div>

        <div
          ref={treeZoneRef}
          className="relative h-[560px] w-full md:h-[640px] lg:h-[700px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={`pointer-events-none absolute inset-0 rounded-3xl  transition-colors duration-500 ${
              hover ? 'bg-[var(--wv-surface-container-low)]/40' : 'bg-transparent'
            }`}
          />

          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.1]">
            {CHAOS_FLOATING.map(({ text, className, delay }) => (
              <div key={text} className={className} style={delay ? { animationDelay: delay } : undefined}>
                {text}
              </div>
            ))}
          </div>

          {zoneSize.w > 0 && (
            <>
              <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                <AnimatePresence>
                  {layout.edges.map((edge) => {
                    const stroke = EDGE_STROKE[edge.targetTone] || 'var(--wv-tone-character)';
                    const width = Math.max(2.4 - (edge.depth - 1) * 0.6, 1.1);
                    return (
                      <motion.path
                        key={edge.id}
                        d={edge.d}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={width}
                        strokeLinecap="round"
                        strokeOpacity={0.85}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={EDGE_PATH_TRANSITION}
                      />
                    );
                  })}
                </AnimatePresence>

                {Object.entries(layout.nodes).map(([id, pos]) => {
                  if (id === 'story') return null;
                  const fill = EDGE_STROKE[pos.tone] || 'var(--wv-tone-character)';
                  return (
                    <motion.circle
                      key={`dot-${id}`}
                      cx={pos.x}
                      cy={pos.y}
                      r={pos.isLeaf ? 3 : 4}
                      fill={fill}
                      fillOpacity={0.9}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, cx: pos.x, cy: pos.y }}
                      transition={NODE_DOT_TRANSITION}
                    />
                  );
                })}
              </svg>

              <AnimatePresence>
                {[...visibleIds].map((id) => {
                  const node = NODES_BY_ID[id];
                  const pos = layout.nodes[id];
                  if (!node || !pos) return null;
                  return (
                    <TreeNode
                      key={id}
                      node={node}
                      pos={pos}
                      isRoot={id === 'story'}
                      attached={attached[id] || []}
                      hover={hover}
                    />
                  );
                })}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      <HeroFlyingLayer
        flying={flying}
        layout={layout}
        heroRef={heroRef}
        treeZoneRef={treeZoneRef}
        zoneSize={zoneSize}
        onTypingPhaseComplete={onTypingPhaseComplete}
        onJourneyComplete={onJourneyComplete}
      />
    </section>
  );
}
