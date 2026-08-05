export const ENGAGEMENT_MODEL_MAP = {
  "fixed-scope-audit": "Fixed-Scope Audit",
  "turnkey-implementation": "Turnkey Implementation",
  "fractional-retainer": "Fractional Retainer"
} as const;

export type EngagementModelSlug = keyof typeof ENGAGEMENT_MODEL_MAP;
