import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {ProjectSchema} from '@/schema/project.schema';
import {ArchitectureSchema} from '@/schema/architecture.schema';
import {ServiceSchema} from "@/schema";

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: ProjectSchema,
});

const architecture = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/architecture' }),
  schema: ArchitectureSchema,
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: ServiceSchema,
  type: 'data',
})

export const collections = { services, projects, architecture };



