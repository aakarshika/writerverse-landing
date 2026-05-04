import { hierarchy, tree as d3tree } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';
import { NODES_BY_ID, TREE_DATA } from './heroConstants';

export function buildPruned(node, visibleSet) {
  if (!visibleSet.has(node.id)) return null;
  const kids = (node.children || [])
    .map((c) => buildPruned(c, visibleSet))
    .filter(Boolean);
  const out = { id: node.id, label: node.label, tone: node.tone };
  if (kids.length) out.children = kids;
  return out;
}

export function computeForVisible(visibleSet, width, height) {
  const pruned = buildPruned(TREE_DATA, visibleSet);
  if (!pruned) return { nodes: {}, edges: [] };

  const padLeft = 60;
  const padRight = 240;
  const padTop = 50;
  const padBottom = 50;

  const treeW = Math.max(width - (padLeft + padRight), 220);
  const treeH = Math.max(height - (padTop + padBottom), 220);

  const root = hierarchy(pruned);
  d3tree()
    .size([treeH, treeW])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.4))(root);

  const linkGen = linkHorizontal()
    .x((d) => d.y + padLeft)
    .y((d) => d.x + padTop);

  const nodes = {};
  root.descendants().forEach((n) => {
    nodes[n.data.id] = {
      x: n.y + padLeft,
      y: n.x + padTop,
      depth: n.depth,
      tone: n.data.tone,
      isLeaf: !n.children,
    };
  });

  const edges = root.links().map((l) => ({
    id: `${l.source.data.id}->${l.target.data.id}`,
    source: l.source.data.id,
    target: l.target.data.id,
    targetTone: l.target.data.tone,
    depth: l.target.depth,
    d: linkGen(l),
  }));

  return { nodes, edges };
}

/** Vertical offset from node layout center to flying / docked phrase row center. */
export function phraseDockCenterDy(targetId, stackIndex) {
  const row = 40;
  if (targetId === 'story') return 72 + stackIndex * row;
  const node = NODES_BY_ID[targetId];
  const base = node?.children ? 34 : 30;
  return base + stackIndex * row;
}

export function typingDurationMs(text, fast) {
  const perChar = fast ? 16 : 38;
  const cap = fast ? 2200 : 5200;
  return Math.min(Math.max(480, text.length * perChar), cap);
}

/** Pause after the last character so the line can be read before sliding. */
export function dwellAfterTypingMs(fast) {
  return fast ? 280 : 560;
}
