// @ts-check
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
  }
});
