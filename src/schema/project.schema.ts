import {z} from 'astro/zod';

export const ProjectChallengeSchema = z.object({
  title: z.string(),
  problem: z.string(),
  solution: z.string(),
});

export type ProjectChallenge = z.infer<typeof ProjectChallengeSchema>;

export const ProjectRetrospectiveSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type ProjectRetrospective = z.infer<typeof ProjectRetrospectiveSchema>;

export const ProjectStackSchema = z.object({
  frontend: z.array(z.string()).default([]),
  backend: z.array(z.string()).default([]),
  database: z.array(z.string()).default([]),
  devops: z.array(z.string()).default([]),
});

export type ProjectStack = z.infer<typeof ProjectStackSchema>;

export const RelatedLinkSchema = z.object({
  title: z.string().optional(),
  url: z.string(),
  type: z.enum(['blog', 'case-study', 'external', 'repo']).default('external'),
});

export type RelatedLink = z.infer<typeof RelatedLinkSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.array(z.string()),
  description: z.array(z.string()),
  about: z.array(z.string()),
  bannerUrl: z.string(),
  role: z.string(),
  timeline: z.string(),
  client: z.string().optional(),

  // Project Classification
  projectType: z.enum(['SaaS Product', 'Client Work', 'Open Source', 'Internal Tool', 'GovTech', 'Personal']).optional(),

  // Display & Navigation Control
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(99),
  tags: z.array(z.string()).optional(),

  // Highlighting Core Project Deliverables
  features: z.array(z.string()).optional(),
  metrics: z.array(z.string()).optional(),
  showcase: z.array(z.string()).optional(),

  // Tech Stack & Architecture
  stack: ProjectStackSchema,
  architecture: z.array(z.string()),
  challenges: z.array(ProjectChallengeSchema),
  retrospective: z.array(ProjectRetrospectiveSchema).optional(),

  // Related Articles & External Links
  related: z.array(z.union([z.string(), RelatedLinkSchema])).optional(),
  repoUrl: z.url().optional(),
  liveUrl: z.url().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
