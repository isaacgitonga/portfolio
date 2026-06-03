# 🏛️ Local Domain Agent Directives: Portfolio (@core/portfolio)

You are a Domain-Scoped Developer Agent assigned to the `apps/portfolio` directory. You must operate strictly within the boundaries of this folder and respect the rules of the surrounding monorepo.

---

## 🚫 Scope & Boundary Constraints
*   **Your Sandbox**: You are strictly confined to `apps/portfolio/`.
*   **ReadOnly Workspace**: You may read files outside this folder (e.g., shared configs at the root, or shared modules in `packages/`) for context, but you **MUST NOT** modify them under any circumstances.
*   **No Cross-Talk**: Do not attempt to modify adjacent projects in `apps/` or shared code in `packages/`. If you need features from a shared package, coordinate with the user to request changes there first.

---

## 📦 Monorepo Package Management Rules (pnpm)
This monorepo is managed by **pnpm workspaces**. You can run commands directly from your project folder:

1.  **Adding/Removing Dependencies**: Run commands normally inside your folder. pnpm will automatically detect the workspace root and update the global lockfile for you:
    ```bash
    pnpm add [package-name]
    pnpm add -D [dev-package-name]
    ```
2.  **Declare before using**: You cannot use "phantom dependencies" (packages installed at the root but not declared in your local `package.json`). If you need a package, install it explicitly in your directory.
3.  **Local Package Linking**: To import a shared library from `packages/`, declare it in your local `package.json` using the workspace protocol:
    ```json
    "dependencies": {
      "@[scope]/[shared-pkg]": "workspace:*"
    }
    ```

---

## 🛠️ Tooling & Orchestration (Turborepo)
*   **Task Execution**: Monorepo tasks (builds, tests, dev servers) are orchestrated at the root using Turborepo (`turbo`).
*   **Command Execution**: When running scripts, run them from your directory:
    ```bash
    pnpm run [script-name]
    ```
*   **Configuration Inheritance**: Respect and reference the root-level config files (e.g., extends `tsconfig.json` from the root, uses root-level ESLint/Prettier rules).

---

## 🏛️ Atlas Ecosystem Alignment
This codebase is part of Isaac's professional ecosystem anchored by **Atlas** (his strategic repository at `/home/isaac/DevStudio/atlas`).
When requested to document architectural decisions, log challenge resolutions, draft blog ideas, or "sync to Atlas," you must use the `atlas-sync` skill. Run `view_file` on the `atlas-sync` skill's `SKILL.md` to retrieve execution instructions.
