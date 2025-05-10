import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { zTechnology } from './content/schemas/technology';

const technologies = defineCollection({
  loader: file('src/content/technologies.json'),
  schema: zTechnology
});

export const collections = { technologies };
