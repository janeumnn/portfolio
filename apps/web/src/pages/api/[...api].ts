import type { APIContext, APIRoute } from 'astro';
import { api } from '@portfolio/api';

export const prerender = false;

export const ALL: APIRoute = (context: APIContext) =>
  api.fetch(context.request, context.locals.runtime.env);
