import type { ExecutionContext } from '@cloudflare/workers-types';
import type { AppType } from '#/index';
import type { AppContext } from '#/types';
import { api } from '#/index';
import { DetailedError, hc, parseResponse } from 'hono/client';

export function createClient(env: AppContext['Bindings'], ctx?: ExecutionContext) {
  return {
    fetch: hc<AppType>('http://local', {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const req = new Request(input, init);
        return api.fetch(req, env, ctx);
      }
    }),
    parse: parseResponse
  };
}

export type ApiError = DetailedError;
