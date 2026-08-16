import { oxfmt } from 'oxc-config-mantine'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...oxfmt,
  semi: false,
  singleQuote: true,
  sortImports: true,
})
