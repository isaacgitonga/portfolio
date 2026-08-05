export const INQUIRY_CATEGORY_MAP = {
  "system-architecture-audit": "System Architecture & Risk Auditing",
  "fractional-cto-leadership": "Fractional CTO & Technical Leadership",
  "dedicated-backend-build": "Dedicated Backend & Infrastructure Build",
  "api-design-integration": "API Design & Integration",
  "database-design-performance": "Database Design & Query Performance",
  "greenfield-mvp-builds": "Greenfield Platforms & MVP Builds",
  "ai-agents-automation": "AI, Agents & Workflow Automation",
  "data-heavy-ui-state": "Data-Heavy UI & State Management",
  "general-inquiry": "General System Inquiry"
} as const;

export type InquiryCategorySlug = keyof typeof INQUIRY_CATEGORY_MAP;
