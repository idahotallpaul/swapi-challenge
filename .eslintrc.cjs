/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'sort-destructure-keys',
    'import',
    'sort-export-all',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'react/display-name': 0,
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
    'sort-export-all/sort-export-all': 'error',
    'prettier/prettier': 'error',
    // 'sort-keys': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
};
