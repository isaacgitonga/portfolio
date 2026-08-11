# Portfolio Astro Schemas & Data Models (`atlas/portfolio/schemas.md`)

> **Directory Purpose**: Canonical TypeScript interfaces, Astro Zod Content Collection schemas, slug dictionaries, and cross-referencing graph utilities for `isaacgitonga.com`.

---

## 🗂️ 1. Category & Engagement Model Dictionaries

### Inquiry Categories Dictionary (`constants/inquiryCategories.ts`)
```typescript
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
```

### Engagement Models Dictionary (`constants/engagementModels.ts`)
```typescript
export const ENGAGEMENT_MODEL_MAP = {
  "fixed-scope-audit": "Fixed-Scope Audit",
  "turnkey-implementation": "Turnkey Implementation",
  "fractional-retainer": "Fractional Retainer"
} as const;

export type EngagementModelSlug = keyof typeof ENGAGEMENT_MODEL_MAP;
```

---

## 📐 2. Service Card TypeScript Interface (`types/service.ts`)

```typescript
import type { InquiryCategorySlug } from "../constants/inquiryCategories";
import type { EngagementModelSlug } from "../constants/engagementModels";

export interface ServicePricing {
  model: EngagementModelSlug;
  anchorText: string; // e.g. "Starting from $3,500"
  timeline: string;   // e.g. "1–2 Weeks Execution"
  startingFrom?: number;
}

export interface RelatedArticles {
  architecture?: string[]; // Slugs from src/content/architecture/
  caseStudies?: string[];  // Slugs from src/content/case-studies/
  blogPosts?: string[];    // Slugs from src/content/blog/
}

export interface ServiceCard {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: InquiryCategorySlug;

  problem: {
    headline: string;
    points: string[];
  };

  approach: {
    headline: string;
    points: string[];
  };

  deliverables: string[];

  techStack: {
    communityTools: string[];
    internalPackages?: string[];
  };

  pricing: ServicePricing;
  articles?: RelatedArticles;
  status: "live" | "in-development" | "incubating";
}
```

---

## 📑 3. Astro Content Collection Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z, reference } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    category: z.enum([
      "system-architecture-audit",
      "fractional-cto-leadership",
      "dedicated-backend-build",
      "api-design-integration",
      "database-design-performance",
      "greenfield-mvp-builds",
      "ai-agents-automation",
      "data-heavy-ui-state",
      "general-inquiry"
    ]),
    problem: z.object({
      headline: z.string(),
      points: z.array(z.string())
    }),
    approach: z.object({
      headline: z.string(),
      points: z.array(z.string())
    }),
    deliverables: z.array(z.string()),
    techStack: z.object({
      communityTools: z.array(z.string()),
      internalPackages: z.array(z.string()).optional()
    }),
    pricing: z.object({
      model: z.enum(["fixed-scope-audit", "turnkey-implementation", "fractional-retainer"]),
      anchorText: z.string(),
      timeline: z.string(),
      startingFrom: z.number().optional()
    }),
    articles: z.object({
      architecture: z.array(reference('architecture')).optional(),
      caseStudies: z.array(reference('caseStudies')).optional(),
      blogPosts: z.array(reference('blog')).optional()
    }).optional(),
    status: z.enum(["live", "in-development", "incubating"]).default("live")
  })
});

export const collections = {
  services: servicesCollection
};
```

---

## 🔗 4. Content Graph & Backlink Resolvers (`lib/contentGraph.ts`)

```typescript
import { getCollection, getEntries, type CollectionEntry } from 'astro:content';

/** Resolve explicit forward links from Service to Architecture Specs */
export async function getRelatedSpecs(service: CollectionEntry<'services'>) {
  if (!service.data.articles?.architecture) return [];
  return await getEntries(service.data.articles.architecture);
}

/** Resolve dynamic backlinks: Find all Services that reference an Architecture RFC */
export async function getServicesForArchitecture(archSlug: string) {
  const allServices = await getCollection('services');
  return allServices.filter(service => 
    service.data.articles?.architecture?.some(ref => ref.slug === archSlug)
  );
}
```
