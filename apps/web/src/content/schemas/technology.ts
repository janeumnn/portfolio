import { z } from 'astro:content';

export const zTechnology = z.object({
  id: z.string(),
  type: z.enum(['runtime', 'frontend', 'backend', 'cms', 'database', 'cicd']),
  icon: z.string(),
  textColor: z.string()
});

export type Technology = z.infer<typeof zTechnology>;
