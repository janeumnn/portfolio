import type { Env } from './env';
import { createFactory } from 'hono/factory';

export default createFactory<Env>();
