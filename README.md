# isaacgitonga.com

Source for [isaacgitonga.com](https://isaacgitonga.com), Isaac Gitonga's portfolio and services site. It covers
selected work, an architecture catalog, the services offered, and an inquiry form that emails both sides through Resend.

## Stack

- [Astro](https://astro.build) 7, server-rendered on Vercel through `@astrojs/vercel`
- React islands for interactive parts (the inquiry form uses React Hook Form and Zod)
- Tailwind CSS 4, GSAP for animation, Mermaid for diagrams, Lucide icons
- [React Email](https://react.email) templates sent through [Resend](https://resend.com)

## Getting started

Requires Node.js 22.12 or later and pnpm, which is pinned in `package.json`. Run `corepack enable pnpm` once per
Node version so `pnpm` resolves to the pinned release.

```bash
git clone https://github.com/isaacgitonga/portfolio.git
cd portfolio
pnpm install
cp .env.example .env   # then fill in RESEND_API_KEY
pnpm dev
```

Both variables in `.env.example` are required. The app throws a `CONFIG_ERROR` at startup if either is missing.

## Commands

| Command        | Does                                                     |
| :------------- | :------------------------------------------------------- |
| `pnpm dev`     | Dev server at `localhost:4321`                           |
| `pnpm build`   | Production build into `dist/` and `.vercel/output/`      |
| `pnpm preview` | Serve the production build locally                       |
| `pnpm email`   | React Email preview of `src/emails/` at `localhost:3003` |
| `pnpm astro …` | Astro CLI (`astro add`, `astro check`, …)                |

## Project structure

```text
src/
├── actions/          Astro Actions; `inquire` validates the form and sends both emails
├── content/          Content collections (JSON and Markdown)
│   ├── architecture/ Architecture catalog entries
│   ├── projects/     Selected work
│   ├── services/     Service offers
│   └── raw/          Staging area for imported material, not rendered
├── content.config.ts Collection definitions
├── emails/           React Email templates and their Tailwind theme
├── schema/           Zod schemas for collections and the inquiry form
├── pages/            Routes: /, /about, /work, /architecture, /services, /automation, /inquiry
├── components/  layouts/  animations/  styles/  utils/  types/  constants/
└── app.config.ts     Profile links, availability and service keys
docs/                 Build specs: wireframes, schemas, canonical copy, decision log
```

## Content and docs

- Pages render from the collections in `src/content/`, validated by the schemas in `src/schema/`.
- `docs/` holds how the site is built: [`wireframes.md`](docs/wireframes.md) (sitemap and page breakdowns),
  [`schemas.md`](docs/schemas.md), [`copy.md`](docs/copy.md) (canonical copy), and
  [`overrides.md`](docs/overrides.md) (the decision log). `blueprint.md` is a superseded draft.
- Business facts (positioning, service definitions and statuses, case-study context) are owned outside this repo.
  Copy here follows them. [`AGENTS.md`](AGENTS.md) spells out the boundary and the working rules for coding agents.

## History

Version 1 was a Vite site in vanilla HTML and TypeScript; its last commit is `37f8b6c`. Version 2 is the Astro rewrite that follows it. It
was built in a monorepo from June to October 2026 and moved back here with its full commit history.
