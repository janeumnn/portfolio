interface ImportMetaEnv {
  readonly AUTHOR_NAME: string;
  readonly AUTHOR_EMAIL: string;
  readonly SOCIALS_GITHUB: string;
  readonly SOCIALS_LINKEDIN: string;
  readonly SOCIALS_INSTAGRAM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'typewriter-effect/dist/core' {
  import type { TypewriterClass } from 'typewriter-effect';

  export default class TypeWriter extends TypewriterClass {}
}
