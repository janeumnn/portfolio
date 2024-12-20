import baseConfig from '@janeumnn/eslint-config';
import astro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.COnfig[]} */
export default [...baseConfig, ...astro.configs.recommended];
