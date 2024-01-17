import antfu from '@antfu/eslint-config'

export default await antfu({
  gitignore: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  typescript: true,
  jsonc: false,
  yaml: false,
  react: true,
  rules: {
    'no-console': 'off',
    'ts/ban-ts-comment': 'off',
    '@ts-expect-error': 'off',
    'no-inline-styles': 'off',
    'ts/consistent-type-imports': 'off',
  },
})
