// think this is needed?
require('prettier-plugin-tailwindcss');

module.exports = {
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  tailwindConfig: './tailwind.config.ts',
  plugins: [
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  tailwindFunctions: ['twMerge', 'cva', 'cn', 'cslx', 'twSort'],
};
