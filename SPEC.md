

## Role and workflow

You are building a personal portfolio website for Ayush, a final-year CSE student at BIT Mesra
targeting SDE roles at product companies. Read this entire spec before writing any code.

Work in phases. After each phase, stop and show me what you built so I can review before you
continue. Do not run ahead.

Rules:
- Never claim something works unless you have actually run it and seen the output. If you did not
  verify it, say so explicitly.
- Do not invent content. Anything not in this spec — URLs, dates, numbers, names — goes in as a
  clearly marked `TODO:` placeholder, and you tell me at the end of the phase what you need.
- Do not add features I did not ask for. No blog, no dark-mode toggle, no analytics, no cookie
  banner, no chatbot, no scroll animations.
- Keep the dependency list minimal. Justify anything beyond the stack listed below.

---

## Phase 0 — Scaffold

- Next.js (App Router) + TypeScript + Tailwind CSS.
- Configure for **static export**: `output: 'export'` and `images: { unoptimized: true }` in
  `next.config.ts`. No API routes, no server-side data fetching, no dynamic runtime — the whole
  site must build to plain static files with `next build`.
- Fonts via `next/font/google`, self-hosted at build time.
- Confirm `next build` produces `out/` successfully before ending this phase.

Target file layout:

```
app/
  layout.tsx
  page.tsx                        landing
  projects/[slug]/page.tsx        case study (generateStaticParams)
  not-found.tsx
components/
  Nav.tsx  Footer.tsx  MetricSlip.tsx  ProjectCard.tsx  Section.tsx  Prose.tsx
content/
  projects.ts                     typed data — all project content lives here
  profile.ts                      name, tagline, links
public/
  resume.pdf                      TODO placeholder
```

All page content is rendered from `content/*.ts`. No copy hardcoded inside components.

---

## Phase 1 — Design system

Implement as CSS variables in `app/globals.css` plus Tailwind theme extension. Do not deviate
from these values.

**Palette.** The accent colours come from competitive-programming judge verdicts — green for
accepted, red for failure. This is deliberate; it is the subject's own vocabulary.

```
--paper    #EDEEF0   page background, cool light grey
--surface  #FFFFFF   cards, slips
--ink      #14181D   primary text, blue-black
--muted    #5A636E   secondary text, labels
--rule     #D3D7DC   hairlines and borders
--accept   #1B7A4B   links, headline metrics
--fail     #A03A2E   used ONLY in "what broke" sections
```

**Type.** Three roles, all from Google Fonts:
- Display — **Spectral**, weight 600, for `h1`/`h2`. Tight tracking (`-0.02em`).
- Body — **IBM Plex Sans**, 400/500.
- Data — **IBM Plex Mono**, 500, uppercase, letter-spaced `0.08em` for labels. Every number,
  metric, stack chip, and section label uses this face with `font-variant-numeric: tabular-nums`.

Scale: 15px body / 1.65 line-height. h1 clamp(2.25rem, 5vw, 3.25rem). h2 1.5rem. Labels 0.6875rem.

**Layout.** Single column, `max-width: 720px`, centred. On screens ≥1024px, section labels sit in
a left margin rail outside the text column (absolute-positioned, right-aligned, mono, muted).
Below 1024px they stack above their section. Section separation is vertical space plus a 1px
`--rule` hairline — no card shadows, no border-radius above 2px.

**Signature element — the metric slip.** This is the one memorable thing on the site; everything
else stays quiet. It is a small hairline-bordered block on `--surface` that renders a measured
number the way the judge itself would print it:

```
┌──────────────────────────────┐
│ SUSTAINED THROUGHPUT         │   ← mono, 0.6875rem, --muted, uppercase
│ 19.1 verdicts/min            │   ← mono, 1.5rem, --ink; the numeral in --accept
└──────────────────────────────┘
```

Build it as `<MetricSlip label value unit />`. Used once per project card on the landing page and
in rows of 2–3 inside case studies. Never animated.

**Motion.** None, except a 120ms underline transition on link hover. Honour
`prefers-reduced-motion`.

**Quality floor:** responsive to 360px, visible keyboard focus rings (2px `--accept` outline),
semantic landmarks, real `<title>` and meta description per page, `alt` on every image.

---

## Phase 2 — Landing page

Sections in order:

1. **Header.** Name. One-line positioning statement. A single row of links: GitHub, LinkedIn,
   Email, Résumé (PDF). No hero image, no photo, no gradient.
2. **Projects.** Three cards. Each: title, one-sentence description, stack chips (mono), one
   `MetricSlip`, and two links — "Live" and "Source" — plus the card title linking to the case
   study.
3. **About.** Three or four sentences maximum.
4. **Footer.** Email and the repo link for the site itself.

Write the positioning line and about copy yourself, then show me both and let me approve or
rewrite them. Constraints on the copy: plain verbs, no adjectives like "passionate", "driven", or
"innovative", no third person, no exclamation marks. The through-line is that he builds systems
and then measures them.

---

## Phase 3 — Case study template

One shared template rendering from `content/projects.ts`. Section order for every project:

| Section label | Contents |
|---|---|
| OVERVIEW | One paragraph. Live link and source link directly beneath. |
| PROBLEM | Why this exists. 2–3 sentences. |
| ARCHITECTURE | Short prose plus a stack list. |
| ENGINEERING | 2–3 sub-points, each with its measured result in a `MetricSlip`. |
| WHAT BROKE | The debugging story, told honestly. `--fail` accent on the label only. |
| RESULTS | A table of measured numbers, mono, tabular figures. |

The WHAT BROKE section is the most important one on the page — it is what a hiring engineer
actually reads. Give it the same visual weight as the others; do not tuck it away.

---

## Phase 4 — Project content

Use exactly these facts. Do not round, embellish, or add numbers that are not here.

### 1. CodeArena — `/projects/codearena`
Full-stack competitive programming judge and contest platform.

- Stack: MERN, TypeScript, Redis, Docker, BullMQ, Socket.io, Next.js, Gemini API
- Features: sandboxed judge pipeline, real-time verdict streaming, ICPC-style contests with Redis
  ZSET leaderboards, AI hint system
- Deployed on an Azure VM behind Caddy with DuckDNS
- Headline metric: **19.1 verdicts/min** sustained throughput
- Load test (15 bots, 5-minute run): peak queue depth 45 (at cap), judge latency p50 140.7s /
  p95 144.3s at saturation, submission POST p95 416ms (flat under load), drain time 140.1s
- Read-path test (k6): 250 virtual users, 55,900 requests, 0% errors, p95 ~130ms; API latency
  stayed flat at ~140ms p95 through 1000 VUs
- Compile optimisation: precompiled `bits/stdc++.h` into the judge image, saving a fixed ~820ms
  per compile (~70% of compile time). Note honestly that compile is only ~8% of total judge time —
  the real bottleneck is BullMQ pickup plus sequential per-test container spin-up.
- WHAT BROKE — two stories, both included:
  1. A timeout-slot-release bug, found by applying Little's law to throughput and queue-depth
     numbers that did not reconcile. Verified the fix with a three-way count check
     (client submissions = queued jobs = verdicts returned).
  2. Load-test results were contaminated by HTTP 429s from rate limiting; fixed with a fresh bot
     pool and a 2-second rate-floor margin.
  3. At 500 VUs the read path degraded — traced to Caddy being OOM-killed in a restart loop
     (64MB memory limit, 18 kernel OOM events). Raising the limit to 512MB cleared it: the
     ceiling was configuration, not the application.
- Live URL: `TODO`
- Source: `TODO`

### 2. Nakalchi — `/projects/nakalchi`
Source-code plagiarism detection engine for programming judges.

- Implements the Stanford winnowing algorithm (the MOSS paper, SIGMOD 2003)
- Stack: TypeScript monorepo (core / service / web), MongoDB, Redis, BullMQ, Next.js report UI,
  Docker Compose, deployed alongside CodeArena on the same Azure VM
- Headline metric: **~51x** candidate pruning
- Benchmark on the production VM, n=1000 submissions: 1.42s wall time, 443.8MB peak RSS.
  Worth stating plainly: the pruning made worker threads unnecessary.
- 91 tests. Byte-offset region highlighting verified to the character.
- Integration: contest finalise → analysis → signed webhook → integrity tab in the CodeArena
  admin UI → per-pair report. On the seeded corpus it flagged 17 pairs, clustering exactly on the
  planted variants. Failure isolation verified by stopping the service and confirming CodeArena
  degraded gracefully.
- WHAT BROKE: a candidate-count anomaly traced to a fixed absolute bound in the corpus cap, and
  confirmed by ablation. Production hardening also surfaced a stale container image missing the
  integration, an unanchored cleanup regex, no swapfile on the VM, and a seeded admin password
  (rotated).
- Live URL: `https://nakalchi-ayush.duckdns.org`
- Source: `TODO`

### 3. Lunar Crater Detection — `/projects/lunar-crater-detection`
B.Tech research project — crater detection on Chandrayaan-2 imagery. Guide: Dr. Subrajeet
Mohapatra, Associate Professor, CSE, BIT Mesra.

- YOLOv11 with a ResNet101 backbone (94.1M parameters), trained on Chandrayaan-2 OHRC and TMC-2
  datasets
- Headline metric: **mAP50 0.683** on OHRC
- OHRC (300 epochs, 2.5h on a T4): precision 0.781, recall 0.683, mAP50 0.683, mAP50-95 0.355 —
  slightly ahead of the reference implementation's 0.667
- TMC-2 (150 epochs, 3.4h on a T4): precision 0.798, recall 0.528, mAP50 0.589, mAP50-95 0.343
- Backbone ablation against stock YOLO11n: TMC-2 mAP50 0.327, OHRC mAP50 0.303
- Deployment study: exported to ONNX and benchmarked on CPU (Ryzen 5 7530U). The finding was
  negative and should be reported as such — FP32 ONNX ran at 0.73–0.86x of PyTorch even with a
  tuned runtime session, and INT8 dynamic quantisation was 15–20x *slower* with accuracy loss,
  because there is no fast INT8 convolution path in the ONNX Runtime CPU provider for dynamic
  quantisation, so a convolution-heavy ResNet falls back to dequantise-then-compute.
- WHAT BROKE: training was moved off Colab to Kaggle after repeated VM recycles and model
  download failures. Hugging Face Spaces changed its policy mid-project so Gradio hosting required
  a paid tier; the demo was moved to Streamlit Community Cloud with weights pulled from a Hugging
  Face model repo at app startup.
- Live demo: `https://lunar-crater-detection.streamlit.app/`
- Source: `https://github.com/Ayush-142/Lunar-Crater-Detection` (branch `master`)
- Result images available in the repo under `results/{tmc2,ohrc}_results/` — `results.png`,
  `confusion_matrix_normalized.png`, `val_batch*_pred`

Note the ONNX result is a negative finding reported honestly. Present it that way. Do not
rewrite it as a success.

---

## Phase 5 — Build, verify, deploy

- Run `next build` and confirm a clean static export.
- Check every internal and external link resolves.
- Test at 360px, 768px, and 1440px.
- Run Lighthouse. Target 100 on accessibility, 95+ on performance. Report the actual scores you
  measured — not estimates.
- Add a `README.md` with local dev and deploy steps.
- Deploy config: works on Vercel as-is; also add a GitHub Pages workflow with `.nojekyll` and a
  note about `basePath` if it is served from a subpath.

---

## Placeholders I need to supply

Collect these into one list and ask me at the end of Phase 4:

- LinkedIn URL
- Public email address
- CodeArena live URL and repo URL
- Nakalchi repo URL
- Portfolio repo URL
- `public/resume.pdf`
- Custom domain, if any