import { z } from 'astro/zod';

export const ArchitectureSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  published: z.boolean().default(true),
});

export type Architecture = z.infer<typeof ArchitectureSchema>;
