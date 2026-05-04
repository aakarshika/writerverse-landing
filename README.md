# Writerverse

Writerverse is a **craft workspace for long-form fiction**. Brain dumps, outlines, and drafts are meant to become a **living structure**—graph, beats, timelines—so you work with **continuity**, not only the next paragraph. This repository holds the **public landing**: React, Vite, Framer Motion, and a small D3 layout for the hero “chaos → structure” story.

The site is deliberate about narrative: motion and demos explain the product, not generic “AI writing” decoration. Deeper interaction notes live in **`design.md`**.

---

## What the product is for

- **Tokenized intelligence** — Treat prose and notes as atoms: entities, motives, and plot weight can be traced across chapters and linked to workspace objects (characters, places, threads).

- **Narrative structure** — Ideas organize under dimensions like **character**, **world**, and **plot** (and whatever you add). The landing hero mirrors that: phrases drift, then snap into a tree—the same mental model the editor uses.

- **Continuity first** — The system remembers what the story already promised: open threads, contradictions, motifs, and timeline alignment—not a surface that forgets the last chapter.

- **Editor-native feel** — A serious planning and writing surface, not interchangeable SaaS. Accessibility for motion (`prefers-reduced-motion`) and sane behavior on small screens matter.

---

## AI we are using

Writerverse is not “replace the author in one click.” We are wiring models to **amplify structure and memory** under explicit author control.

- **Understanding** — Propose structured parses of drafts and notes (entities, relations, tags); you correct and commit what becomes true in the graph.

- **Retrieval** — Embeddings and search tie new text to your **story bible** so completions and hints stay **on-world**.

- **Classification** — Soft signals: scene function, emotional weight, POV and thematic echoes across a long manuscript.

- **Bounded generation** — Short, contextual help: bridges, alternate phrasings, summaries of what you already wrote for navigation—not wholesale ghostwriting unless you choose it.

- **Evaluation** — Surface likely inconsistencies (names, geography, timeline, stated facts) as **review items**, not silent edits.

We aim for **swappable** backends (hosted APIs or local models); the durable layer is **your graph plus your corpus**.

---

## Agentic work we are building

Here “agentic” means **multi-step, goal-directed** help over your real manuscript state—not a single chat reply.

- **Continuity passes** — Walk a chapter or a diff against the graph and bible; propose missing links, dangling promises, or contradictions; you get a checklist to accept or reject.

- **Structure assistance** — From outline or beat changes, suggest graph updates (nodes, edges, re-parenting) with short **why** explanations tied to story logic.

- **Scoped research** — Tasks like “every mention of this location” or “scenes where this motive appears,” grounded in retrieved context.

- **Orchestration** — Longer jobs (e.g. post-draft audit) split into visible subtasks with progress, cancellation, and **no silent writes** to canon—proposals land in review or a staging layer until you commit.

**Principle:** agents **propose**; you **commit** what becomes authoritative in the workspace.

---

## Developing this repo

```bash
npm install
npm run dev              # Vite (see vite.config for port)
npm run dev:frontend     # e.g. port 5965, strict
npm run build
npm run lint
```

`npm run dev:backend` is a tiny JSON stub; **`make dev`** runs frontend + that stub together. For mobile shells: `npm run cap:sync`, `npm run ios:build` / `android:build`, etc.

**License:** see `package.json`.
