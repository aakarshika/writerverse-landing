# Animation & interaction spec · Writerverse

This is not decoration. Every animation must explain **Writerverse**—ideas turning into structure, beats, and continuity across a long story—without words.

### Writerverse — how this doc fits

- **Product story on the page:** chaos → graph and timeline → analysis; memory and inline suggestions show **continuity**, not a generic “AI writes for you” pitch.
- **What this file is:** interaction and motion principles. It does **not** replace landing essentials: headline hierarchy, typography and color system, primary CTA (waitlist, signup, or demo), proof (quotes, metrics, logos), FAQ, or full responsive behavior—those still need explicit decisions.
- **Lock early:** one sentence for the **hero promise**; **one** flagship interactive demo (timeline **or** graph—not both competing above the fold); visuals that read **editor / craft tool**, not interchangeable SaaS.
- **Ship kindly:** respect `prefers-reduced-motion` (trade springs and ripples for short fades where appropriate); scripted demos are OK at launch; offer lighter or static fallbacks if interaction is heavy on small screens.

---

## 1. Hero animation: “Chaos → Story”

### What happens

- Screen starts with floating phrases (“revenge”, “lost kingdom”, “betrayal”), slightly drifting and unaligned.
- After ~1.5s:
  - Phrases begin snapping together.
  - Lines connect between them.
- Then nodes form: **Character**, **Conflict**, **World**.
- **Final state:** clean graph with subtle pulse animation.

### Tech idea

- Framer Motion + SVG graph (default to **2D** for clarity on the landing; add 3D only if it is deliberately scoped and restrained).
- Use **spring** animations (not linear—or it looks dead).

### Key detail

No “loading.” It should feel like **the system understood instantly**.

---

## 2. “Idea input” demo (fake but believable)

### Interaction

- Pre-filled input: *a girl seeks revenge in a broken ocean kingdom*
- Cursor blinks → text gets “accepted”.

### Animation

- Words split into tokens.
- Tokens slide into categories:
  - `girl` → Character  
  - `revenge` → Motivation  
  - `ocean kingdom` → Setting  

### Visual trick

- Subtle color coding.
- Soft grouping boxes.

### Why it works

User sees: **“I don’t need to organize. It does it.”**

---

## 3. Beat timeline animation (core UX)

### Layout

Horizontal timeline:

```text
[ Beat 1 ] — [ Beat 2 ] — [ Beat 3 ]
```

### Interaction

- Hover **Beat 2**.

### Animation

- Beat expands.
- Right panel shows short summary → expands into full text (typewriter or fade-in lines).

### Extra layer

- Add sliders: tension ↑↓, emotion ↑↓.
- When user adjusts:
  - Text subtly rewrites (fade morph).
  - Graph above shifts.

---

## 4. Graphs that actually feel alive

Static charts = instant boredom.

### Emotional arc animation

- **Initial state:** flat line.
- **Then:** curve draws itself left → right; points appear.
- **On hover:** point glows; tooltip: *“Low tension here”*.

### Cause → effect link (important)

1. User tweaks: “increase tension” on Beat 3.
2. Immediately:
   - Graph spikes upward.
   - Small ripple animation across line.

That ripple is the **“oh this is different”** moment.

---

## 5. Inline suggestion system

### Don’t do

- Big popup yelling advice.

### Do this

**In text**

- A faint underline appears under a sentence.

**On hover**

- Small tooltip: *“Conflict resolves too early”*.

**On click**

- Side panel slides in: suggestion + optional rewrite.

### Animation

- Underline fades in.
- Panel slides softly (200–300ms).

Feels like **the system noticed something, not interrupted you**.

---

## 6. “It remembers everything” demo (high impact)

### Scene

User writes: *“She lifts her sword”*.

### Animation

- “Sword” softly highlights.
- Side panel shows:
  - **Weapon:** Ancient Blade  
  - **Introduced:** Chapter 1  
- Then suggestion appears: *“Earlier injury may affect this action”*.

### Key detail

No dramatic animation—keep it subtle. Magic dies when it tries too hard.

---

## 7. Scroll-based storytelling (glue)

Use scroll as a narrative device.

### Section transitions

| Transition | Behavior |
| ------------ | -------- |
| Chaos → Structure | Elements rearrange while scrolling |
| Structure → Writing | Graph morphs into timeline |
| Writing → Analysis | Timeline slides up → graph overlays |

### Tech

Framer Motion scroll hooks or GSAP ScrollTrigger.

---

## 8. Micro-interactions (“nice” vs “damn”)

### Buttons

- Slight scale (1.02).
- Glow intensifies on hover.

### Cards

- Lift on hover.
- Shadow deepens slightly.

### Nodes

- Tiny pulse every 3–4s.

### Text generation

- Don’t type everything—fade in line-by-line.

---

## 9. Timing rules (where most people fail)

| Type | Duration |
| ---- | -------- |
| Fast animations | 150–250ms |
| Structural transitions | 300–500ms |
| Maximum (unless intentional) | Never exceed 700ms |

If it feels slow, users assume it’s dumb.

---

## 10. What makes it feel “awesome” (not just animated)

Let’s be blunt.

### It’s not

- Gradients  
- Particles  
- “AI glow effects”  

### It’s

1. **Immediate feedback** — User does something → system reacts instantly.
2. **Visible intelligence** — Not “AI generated text,” but **Writerverse reads story structure** (characters, beats, arcs, canon) back to the writer.
3. **Continuity** — Everything connected: beats ↔ graphs ↔ suggestions ↔ text.

---

## Landing spine (optional IA)

Long-scroll narrative that matches this spec without inventing extra gimmicks: **problem** (messy ideas) → **structure appears** (hero + idea demo) → **depth** (beats / arc / sliders) → **craft** (inline suggestions + memory) → **CTA**. Sticky labels or a pinned viewport for the flagship demo can work; avoid stacking many equally loud interactives in one view.
