import baseConfig from '@janeumnn/prettier-config';

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: baseConfig.plugins?.concat(['prettier-plugin-astro', 'prettier-plugin-tailwindcss']),
  tailwindStylesheet: './src/styles/index.css',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }]
};
