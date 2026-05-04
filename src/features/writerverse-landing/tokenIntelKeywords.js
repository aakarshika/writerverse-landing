/**
 * Rich hover content for tokenized spans in the demo sentence.
 * `tone` matches hero tree tones: character | world | plot
 */

export const TOKEN_INTEL_KEYWORDS = [
  {
    id: 'exiled-prince',
    label: 'Exiled Prince',
    tone: 'character',
    links: [
      {
        badge: 'Character arc',
        title: 'Return → reckoning spine',
        summary:
          'Writerverse pins this figure to Arc B3: exile as moral wound, not geography. Motive tags drift toward “prove legitimacy without the crown.”',
      },
      {
        badge: 'Ideas',
        title: 'Identity under pressure',
        summary:
          'Linked note cluster “names vs masks” — three open contradictions (public face / private guilt / prophecy voice) flagged for Chapter 4 alignment.',
      },
    ],
  },
  {
    id: 'oakhaven',
    label: 'Oakhaven',
    tone: 'world',
    links: [
      {
        badge: 'World graph',
        title: 'Primary hub · coastal capital',
        summary:
          'Location node L-17: trade winds, harbor law, and “ash docks” continuity checks. Cross-linked to weather motif sheet and siege timeline v2.',
      },
      {
        badge: 'Ideas',
        title: 'Ruin / restoration tension',
        summary:
          'Theme bucket “city as character” — two unresolved beats: who benefits from the fire, and which district never rebuilt (ghost economy).',
      },
    ],
  },
  {
    id: 'broken-crown',
    label: 'Broken Crown',
    tone: 'plot',
    links: [
      {
        badge: 'Plot object',
        title: 'MacGuffin + symbol stack',
        summary:
          'Object O-09: physical break maps to Act II fracture beat. Heat / glow rules synced with magic-system cap (no resonance inside sworn oaths).',
      },
      {
        badge: 'Character arcs',
        title: 'Antagonist claim vs bloodline',
        summary:
          'Tied to Arc A1 and B3: usurper reads crown as mandate; prince reads it as debt. Conflict card “who gets to interpret the break?” is open.',
      },
    ],
  },
];
