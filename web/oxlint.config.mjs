import { oxlint } from 'oxc-config-mantine'
import { defineConfig } from 'oxlint'

export default defineConfig({
  ...oxlint,
  options: {
    typeAware: true
  },
  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}', 'dist', 'storybook-static'],
})
