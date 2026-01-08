declare module 'typewriter-effect/dist/core' {
  import type { TypewriterClass } from 'typewriter-effect';

  export default class TypeWriter extends TypewriterClass {}
}

declare namespace App {
  type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

  type Locals = Runtime;
}
