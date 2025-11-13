// @ts-check
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV || '', process.cwd(), '');

export default defineConfig({
  site: SITE_URL,
  server: { port: 1337, host: true },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [svelte()],
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains-mono',
        fallbacks: ['monospace'],
        weights: ['100 700'],
        subsets: ['latin'],
        styles: ['normal']
      }
    ]
  },
  env: {
    schema: {
      SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: false,
        url: true
      }),
      AUTHOR_NAME: envField.string({ context: 'server', access: 'public', optional: false }),
      AUTHOR_EMAIL: envField.string({ context: 'server', access: 'public', optional: false }),
      SOCIALS_GITHUB: envField.string({
        context: 'server',
        access: 'public',
        optional: false,
        url: true
      }),
      SOCIALS_LINKEDIN: envField.string({
        context: 'server',
        access: 'public',
        optional: false,
        url: true
      }),
      SOCIALS_INSTAGRAM: envField.string({
        context: 'server',
        access: 'public',
        optional: false,
        url: true
      }),
      SOCIALS_MONKEYTYPE: envField.string({
        context: 'server',
        access: 'public',
        optional: false,
        url: true
      })
    }
  }
});
