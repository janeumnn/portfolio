import baseConfig from '@portfolio/prettier-config';

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: baseConfig.plugins?.concat([
    'prettier-plugin-astro',
    'prettier-plugin-svelte',
    'prettier-plugin-tailwindcss'
  ]),
  tailwindStylesheet: './src/styles/index.css',
  tailwindPreserveWhitespace: false,
  tailwindFunctions: ['cn', 'clsx'],
  overrides: [
    { files: '*.astro', options: { parser: 'astro' } },
    { files: '*.svelte', options: { parser: 'svelte' } },
    { files: '*.mdx', options: { parser: 'mdx' } }
  ]
};
