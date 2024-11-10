import baseConfig from '@janeumnn/prettier-config';

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  plugins: baseConfig.plugins?.concat(['prettier-plugin-svelte', 'prettier-plugin-tailwindcss']),
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
