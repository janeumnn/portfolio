/** @type {import("prettier").Config} */
export default {
  htmlWhitespaceSensitivity: 'ignore',
  jsxBracketSameLine: true,
  bracketSameLine: true,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-packagejson', '@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^[.]'
  ]
};
