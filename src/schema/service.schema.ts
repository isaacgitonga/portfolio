import {z} from 'astro/zod';

export const ServiceProblemSchema = z.object({
  headline: z.string(),
  points: z.array(z.string()),
});

export const ServiceApproachSchema = z.object({
  headline: z.string(),
  points: z.array(z.string()),
});

export const ServiceTechStackSchema = z.object({
  communityTools: z.array(z.string()),
  internalPackages: z.array(z.string()).optional(),
});

export const ServicePricingSchema = z.object({
  model: z.enum(["fixed-scope-audit", "turnkey-implementation", "fractional-retainer"]),
  anchorText: z.string(),
  timeline: z.string(),
  startingFrom: z.number().optional(),
});

export const ServiceArticlesSchema = z.object({
  architecture: z.array(z.string()).optional(),
  caseStudies: z.array(z.string()).optional(),
  blogPosts: z.array(z.string()).optional(),
}).optional();

export const ServiceSchema = z.object({
  id: z.string(),
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
  problem: ServiceProblemSchema,
  approach: ServiceApproachSchema,
  deliverables: z.array(z.string()),
  techStack: ServiceTechStackSchema,
  pricing: ServicePricingSchema,
  articles: ServiceArticlesSchema,
  status: z.enum(["live", "in-development", "incubating"]).default("live"),
});

export type Service = z.infer<typeof ServiceSchema>;
export type ServiceProblem = z.infer<typeof ServiceProblemSchema>;
export type ServiceApproach = z.infer<typeof ServiceApproachSchema>;
export type ServiceTechStack = z.infer<typeof ServiceTechStackSchema>;
export type ServicePricing = z.infer<typeof ServicePricingSchema>;
export type ServiceArticles = z.infer<typeof ServiceArticlesSchema>;