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

## 📦 Monorepo Package Management (pnpm)
* Manage dependencies locally within `apps/portfolio/`.
* Run commands using `pnpm add [pkg]` or `pnpm run [script]`.
* Local package linking with workspace protocol: `"@[scope]/[pkg]": "workspace:*"`.

---

## 🏛️ Atlas Integration & Local Execution Directives

### 1. Upstream Strategic Mirror (`docs/atlas/`)
* Strategic records, positioning, sitemaps, wireframes, and Astro schemas authored in `@core/atlas` (`atlas/portfolio/*`) are directly copied into `apps/portfolio/docs/atlas/`.
* `docs/atlas/` serves as the primary strategic reference for copywriting, titles, `/inquire` SLA flow, and schema designs.

### 2. User-Directed Implementation Rule
* **No Autonomous Refactoring**: Do NOT automatically rewrite or refactor application code (`src/pages/*`, `src/components/*`) simply because files in `docs/atlas/` were updated.
* **Wait for User Command**: Upstream Atlas files may be ahead of the current live website code. Execute updates to application code ONLY when explicitly instructed by Isaac (e.g., *"Refactor the Homepage using docs/atlas"* or *"Implement the /inquire form using docs/atlas/wireframes.md"*).

### 3. Local Overrides Autonomy (`docs/overrides.md`)
* **Not Restricted to Atlas Drafts**: You are NOT strictly locked into what the Atlas agent drafted. If Isaac and you decide on code-level, UI styling, or component-level overrides during implementation, you have full autonomy to adapt the implementation.
* **Log Overrides**: Any deliberate code or design departures from `docs/atlas/` MUST be logged in **`apps/portfolio/docs/overrides.md`** with the date and rationale.
