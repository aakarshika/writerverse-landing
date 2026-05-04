export const TREE_DATA = {
  id: 'story',
  label: 'Story',
  tone: 'root',
  children: [
    {
      id: 'characters',
      label: 'Characters',
      tone: 'character',
      children: [
        { id: 'dialogs', label: 'Dialogs', tone: 'character' },
        { id: 'emotional_weight', label: 'Emotional Weight', tone: 'character' },
      ],
    },
    {
      id: 'world',
      label: 'World',
      tone: 'world',
      children: [{ id: 'magic_system', label: 'Magic System', tone: 'world' }],
    },
    {
      id: 'plot',
      label: 'Plot',
      tone: 'plot',
      children: [
        { id: 'plot_keywords', label: 'Plot Keywords', tone: 'plot' },
        { id: 'arc_ideas', label: 'Arc Ideas', tone: 'plot' },
        { id: 'outline_ideas', label: 'Outline Ideas', tone: 'plot' },
      ],
    },
  ],
};

/** `targetId` can be any visible node (root, category, or leaf). `keywords` = substrings to emphasize (bold) while typing. */
export const PHRASE_SEQUENCE = [
  {
    targetId: 'characters',
    text: 'ensemble keeps swapping who feels like the protagonist',
    keywords: ['ensemble', 'protagonist'],
  },
  {
    targetId: 'dialogs',
    text: "she said: 'don't make me a metaphor.'",
    keywords: ['metaphor'],
  },
  {
    targetId: 'world',
    text: 'harbor bells ring backwards when the tide steals a name',
    keywords: ['backwards', 'tide', 'name'],
  },
  {
    targetId: 'magic_system',
    text: 'magic costs memories — older toll, richer the spell',
    keywords: ['memories', 'spell', 'magic'],
  },
  {
    targetId: 'characters',
    text: 'antagonist genuinely believes they are saving the city',
    keywords: ['antagonist', 'saving', 'city'],
  },
  {
    targetId: 'plot',
    text: 'trickster → reluctant guardian → martyr',
    keywords: ['trickster', 'guardian', 'martyr'],
  },
  {
    targetId: 'plot',
    text: 'cynic learns hope is a discipline',
    keywords: ['cynic', 'hope', 'discipline'],
  },
  {
    targetId: 'dialogs',
    text: '"the king is dead." — "which one?"',
    keywords: ['king', 'dead'],
  },
  {
    targetId: 'magic_system',
    text: 'no magic works inside a sworn promise',
    keywords: ['magic', 'promise'],
  },
];

export const PARENT_OF = {};
export const NODES_BY_ID = {};

function indexTree(node, parent) {
  NODES_BY_ID[node.id] = node;
  if (parent) PARENT_OF[node.id] = parent.id;
  (node.children || []).forEach((c) => indexTree(c, node));
}
indexTree(TREE_DATA, null);

/** SVG / graph edge strokes — aligned with `--wv-tone-*` in `WriterverseLandingPage.css` */
export const EDGE_STROKE = {
  character: 'var(--wv-tone-character)',
  world: 'var(--wv-tone-world)',
  plot: 'var(--wv-tone-plot)',
  root: 'var(--wv-tone-root-stroke)',
};

export const CHAOS_FLOATING = [
  { text: 'betrayal', className: 'chaos-floating absolute left-[8%] top-[30%] font-serif text-3xl text-[var(--wv-secondary)]/30 blur-[0.5px] md:text-5xl' },
  { text: 'broken crown', className: 'chaos-floating absolute left-[12%] top-[68%] font-serif text-3xl text-[var(--wv-primary)]/30 blur-[1px] md:text-5xl', delay: '-2s' },
  { text: 'revenge', className: 'chaos-floating absolute right-[8%] top-[12%] font-serif text-2xl text-[var(--wv-secondary)]/25 blur-[0.5px] md:text-4xl', delay: '-4s' },
  { text: 'the descent', className: 'chaos-floating absolute right-[14%] bottom-[10%] font-serif text-3xl text-[var(--wv-primary)]/25 blur-[0.8px] md:text-5xl', delay: '-1s' },
];

export const TYPING_PHRASE_SURFACE_CLASS =
  'min-w-[min(260px,70vw)] max-w-[min(280px,72vw)] rounded border border-[var(--wv-outline-variant)]/55 bg-[var(--wv-surface-container)]/98 px-2.5 py-2 text-left font-serif text-[10px] italic leading-snug text-[var(--wv-on-surface-variant)] shadow-lg shadow-black/5 backdrop-blur-sm md:min-w-[min(280px,68vw)] md:text-[11px]';

export const SLIDING_PHRASE_SURFACE_CLASS =
  'max-w-[min(280px,72vw)] whitespace-normal rounded border border-[var(--wv-outline-variant)]/50 bg-[var(--wv-surface-container)]/98 px-2.5 py-1.5 text-center font-serif text-[10px] italic leading-snug text-[var(--wv-on-surface-variant)] shadow-lg shadow-black/5 backdrop-blur-sm md:text-[11px]';

export const EDGE_PATH_TRANSITION = {
  pathLength: { duration: 0.58, ease: [0.2, 0.85, 0.2, 1] },
  opacity: { duration: 0.22, ease: 'easeOut', delay: 0.06 },
  d: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const NODE_DOT_TRANSITION = {
  scale: { type: 'spring', stiffness: 300, damping: 21, delay: 0.32 },
  opacity: { duration: 0.2, ease: 'easeOut', delay: 0.28 },
  cx: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  cy: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};
