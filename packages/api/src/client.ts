import type { AppType } from '#/index';
import { DetailedError, hc, parseResponse } from 'hono/client';

export const client = { fetch: hc<AppType>('/'), parse: parseResponse };
export type ApiError = DetailedError;
