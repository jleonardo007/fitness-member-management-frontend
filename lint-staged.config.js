export default {
  '*.{ts,tsx}': (filenames) => [
    `eslint --fix --max-warnings=0 ${filenames.join(' ')}`,
    'tsc --noEmit',
  ],
  '*.{js,cjs,mjs}': ['eslint --fix --max-warnings=0 --no-warn-ignored'],
  '*.{json,md,yml,yaml,css}': ['prettier --write'],
};
