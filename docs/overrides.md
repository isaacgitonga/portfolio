# Portfolio Local Code & Design Overrides (`apps/portfolio/docs/overrides.md`)

> **Purpose**: Log of local code-level, UI layout, and architectural overrides made directly within `apps/portfolio` that depart from or enhance the specifications in `docs/`.  
> **Rule**: The local developer agent is NOT restricted to what the Atlas agent drafted. When Isaac and the local agent decide to make code-level or design overrides specific to `apps/portfolio`, log them here with rationale.

---

## 📋 Active Overrides Log

| Date         | Target Component / Route                   | Override Description                | Rationale / Decision Context                                                                                                                                                                                                                                                                                                |
|:-------------|:-------------------------------------------|:------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2026-08-05   | Services Page (`src/pages/services.astro`) | Simplified Service Cards (Option B) | Removed acute friction and architectural approach bullet lists from index service cards to reduce visual density and improve scannability. Retained deliverables, toolchain chips, pricing anchor, and spec proof links. Full objects preserved in content collections for potential dedicated `/services/[...slug]` pages. |
