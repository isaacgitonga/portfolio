# Portfolio Decisions & Overrides (`apps/portfolio/docs/overrides.md`)

> **Purpose**: The single log of *why things are the way they are* in `apps/portfolio`. Covers both:
> * **Overrides** — deliberate departures from the specifications in `docs/`
> * **Decisions** — choices made *within* spec where the spec was silent (why SSE over polling, why this nav structure, why this section order)
>
> **Rule**: The local agent is NOT restricted to what was drafted. When Isaac and the agent decide on code-level or design changes, log them here with rationale. See `AGENTS.md` §7.5.
>
> **Why decisions and not only overrides**: an unrecorded decision gets silently relitigated or reversed by a future agent, and the reasoning is unrecoverable. `@core/atlas` spent months asserting things nobody could trace, because the reasoning lived in conversation and only the conclusions reached the files. **One log, not two** — a second file is how divergence starts.

---

## Entry Format

Each entry records four things, matching the recommendation shape in `AGENTS.md` §7.3 — so a recommendation converts into a log entry with no rewriting:

| Field | Meaning |
|:---|:---|
| **Date** | When decided |
| **Target** | Component, route, or subsystem affected |
| **The call** | What was decided — override or in-spec decision |
| **Trade-off & what would change it** | What was given up, and the evidence or constraint that would reverse this |

*If "what would change it" is genuinely nothing, say so — that marks a decision as settled rather than provisional.*

---

## 📋 Active Decisions & Overrides Log

| Date         | Target Component / Route                   | Override Description                | Rationale / Decision Context                                                                                                                                                                                                                                                                                                |
|:-------------|:-------------------------------------------|:------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2026-08-05   | Services Page (`src/pages/services.astro`) | Simplified Service Cards (Option B) | Removed acute friction and architectural approach bullet lists from index service cards to reduce visual density and improve scannability. Retained deliverables, toolchain chips, pricing anchor, and spec proof links. Full objects preserved in content collections for potential dedicated `/services/[...slug]` pages. |
