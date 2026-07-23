# Portfolio

Ayush's personal portfolio. Next.js (App Router) + TypeScript + Tailwind CSS, built as a fully
static export — no API routes, no server runtime.

All copy and project data lives in `content/profile.ts` and `content/projects.ts`; components
render from that data rather than hardcoding text.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static site in `out/`. There's no `next start` step — `out/` is plain HTML/CSS/JS and
can be served by any static file host.

To preview the production build locally before deploying:

```bash
npx serve out
```

## Deploy

### Vercel

Works as-is. Import the repo in Vercel and deploy — no configuration needed.

### GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes `out/` to GitHub Pages on every push to
`main` (or via manual dispatch). It requires Pages to be enabled for the repo with the source set
to **GitHub Actions** (Settings → Pages → Build and deployment → Source).

**`basePath`:** GitHub Pages project sites are served from a subpath —
`https://<user>.github.io/<repo>/` — rather than the domain root. `next.config.ts` reads
`NEXT_PUBLIC_BASE_PATH` at build time and passes it to Next's `basePath` option; the workflow sets
it to `/<repo-name>` automatically. If you instead serve from a custom domain or a user/org root
page (`<user>.github.io` with no subpath), delete the `NEXT_PUBLIC_BASE_PATH` env var from the
workflow so the site builds for the root path.

`public/.nojekyll` is included so GitHub Pages serves the `_next/` directory as-is instead of
running it through Jekyll (which ignores underscore-prefixed paths by default).
