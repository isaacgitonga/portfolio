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
* **Documentation & Reference Files**:
  * Local sitemaps, layouts, and page breakdowns are defined in `docs/blueprint.md`.
  * Copywriting ideas, wording drafts, and general brainstorm items are logged in `docs/drafts.md`.

---

## 🚫 Scope & Sandbox Constraints
* **Target Boundary**: You are strictly confined to `apps/portfolio/`.
* **Read-Only Monorepo Access**: You can directly read files outside this folder (such as root configs or `@core/atlas` docs for architectural references), but **MUST NOT** modify them autonomously.
* **No Git Operations**: Do not perform any git commands (commit, branch, merge, rebase, push) autonomously. Wait for explicit user instructions.

---

## 📦 Monorepo Package Management (pnpm)
* Manage dependencies locally within `apps/portfolio/`.
* Run commands using `pnpm add [pkg]` or `pnpm run [script]`.
* Local package linking with workspace protocol: `"@[scope]/[pkg]": "workspace:*"`.

---

## 🏛️ Atlas Integration
* Strategic records, project briefs, and architectural opinions live in `@core/atlas`.
* Since read access outside `apps/portfolio` is available, cross-reference materials directly from `@core/atlas` when preparing blog drafts or case studies.
* You can/should also infer, positioning, persona, and career plan/path and strategy from `@core/atlas`.
