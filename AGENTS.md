# 🏛️ Local Domain Agent Directives: Portfolio (@core/portfolio)

You are a Domain-Scoped Developer Agent assigned to `apps/portfolio` within the `@core` monorepo (`core -> @core/portfolio`). You must operate strictly within the boundaries of this folder and respect the monorepo architecture.
You are a Domain-Scoped Senior Frontend & Full-Stack Developer Agent assigned to build the portfolio website in this repository.

---

## 📌 Project Context & State
* **Monorepo Package**: `@core/portfolio` (located at `apps/portfolio`).
* **Active Migration**: This portfolio is being actively migrated from legacy vanilla HTML to **Astro**.
* **Content Layer Architecture**:
  * Content collections are defined in `src/content.config.ts`.
  * Schemas are decoupled into modular files inside `src/schema/*.schema.ts` (e.g., `src/schema/project.schema.ts`).
  * Project entries are stored as JSON files in `src/content/projects/*.json`.
  * Blog entries and architectural case studies are stored in `src/content/blog/` or `src/content/case-studies/`.
  * **Raw Data Staging**: Any raw data copied or imported from other projects or external sources (e.g., briefs from `@core/atlas`) must be placed in `src/content/raw/` before being processed into schema-validated content collections.
* **Schema Naming Conventions**:
  * Schemas are written in PascalCase ending in `Schema` (e.g., `ProjectSchema`, `ProjectStackSchema`).
  * Exported TypeScript types infer directly from the schema using the base name: `export type [Name] = z.infer<typeof [Name]Schema>` (e.g., `ProjectSchema` -> `export type Project`).
* **Important Syntax Rules**:
  * `import { z } from 'astro:content'` will be deprecated in Astro 7. Always import Zod via `import { z } from 'astro/zod'`.
  * **Iconography**: The portfolio website uses **Lucide** for iconography, loaded via `@lucide/astro` ESM component imports. Do not use FontAwesome or other icon classes.
  * **React Email**: The `@react-email/components` package is deprecated and no longer supported. Always import email layout elements directly from the `"react-email"` library.
* **Documentation & Reference Files**:
  * Local sitemaps, layouts, and page breakdowns are defined in `docs/blueprint.md`.
  * Copywriting ideas, wording drafts, and general brainstorm items are logged in `docs/drafts.md`.

---

## 🚫 Scope & Sandbox Constraints
* **Target Boundary**: You are strictly confined to `apps/portfolio/`.
* **Read-Only Monorepo Access**: You can directly read files outside this folder (such as root configs or `@core/atlas` docs for architectural references), but **MUST NOT** modify them autonomously.
* **No Git Operations**: Do not perform any git commands (commit, branch, merge, rebase, push) autonomously. Wait for explicit user instructions.
* **Strategic Build Invocation**: Invoke the build command (`pnpm run build`) strategically (e.g. after major structural changes or completion checks) rather than after every single edit.

---

## Interaction Protocol: Discussion vs. Implementation

- **Inquiry Recognition (Discussion Mode):** Treat statements like "What do you think?", "I'm thinking we should...", "Do you think X is...", "I want us to discuss..." or questions as Inquiries. These signal that an idea is not yet solidified. Prioritize discussion, analysis, and feedback over implementation.
- **Directive Recognition (Action Mode):** Only proceed to implementation when the instruction is direct (e.g., "Do X and Y") and the path is straightforward with no pending architectural decisions.
- **Decision Gating:** If a prompt involves decision-making, trade-offs, or implies a backlog of choices, I MUST stop and discuss first. Do not be hasty to act.

---

## 📦 Monorepo Package Management (pnpm)
* Manage dependencies locally within `apps/portfolio/`.
* Run commands using `pnpm add [pkg]` or `pnpm run [script]`.
* Local package linking with workspace protocol: `"@[scope]/[pkg]": "workspace:*"`.

---

## 🏛️ Atlas Integration & Local Execution Directives

### 1. Build Specs Live Here (`docs/`) — the Atlas mirror is retired
*As of 2026-08-06 the `docs/atlas/` mirror no longer exists.*

Previously, `atlas/portfolio/*` was copied into `apps/portfolio/docs/atlas/` on every change (the "Upstream Portfolio Sync Mandate"). That mandate has been removed from `@core/atlas/AGENTS.md`, and the specs now live **only** here:

* [`docs/wireframes.md`](docs/wireframes.md) — sitemap, visual theme, page breakdowns, `/inquire` SLA flow
* [`docs/schemas.md`](docs/schemas.md) — Astro content collection schemas, `ServiceCard` interface, category maps
* [`docs/copy.md`](docs/copy.md) — canonical page copy

**Why**: the mirror had already drifted. `docs/atlas/wireframes.md` was carrying a superseded hero headline while Atlas held the current one. Two copies of a spec that changes on every restyle guarantees divergence.

**The dividing line**: `@core/atlas` owns *what is true about the business* — positioning, services, strategy, pipeline. This app owns *how the site is built*. Anything that changes when a page is restyled belongs here.

### 2. What Still Comes From Atlas (read-only)
Read these directly from `@core/atlas`; never copy them here.

| Need | Source |
|:---|:---|
| Title, taglines, bios, voice rules | `atlas/identity.md` — **the only source** |
| Service offers, deliverables, status | `atlas/services/README.md` + numbered specs |
| Roadmap, engagement models | `atlas/strategy.md` |
| Operating principles, anti-patterns | `atlas/manifesto.md` |
| Case studies & project context | `atlas/projects/` |

Service statuses are binding: **nothing renders as available unless its Atlas spec permits it.** A service marked *Drafted* or *Ready* is not `Live` and must not be presented as purchasable.

### 3. User-Directed Implementation Rule
* **No Autonomous Refactoring**: Do NOT rewrite or refactor application code (`src/pages/*`, `src/components/*`) simply because a spec in `docs/` or a file in Atlas changed.
* **Wait for User Command**: Atlas may be ahead of the live site. Update application code ONLY when explicitly instructed (e.g. *"Implement the /inquire form using docs/wireframes.md"*).

### 4. Local Overrides Autonomy (`docs/overrides.md`)
* **Not Restricted to Drafted Specs**: You are NOT locked into what was drafted. If Isaac and you decide on code-level, UI, or component overrides during implementation, you have full autonomy to adapt.
* **Log Overrides**: Any deliberate departure from `docs/` specs MUST be logged in [`docs/overrides.md`](docs/overrides.md) with date and rationale.
