import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginFaker } from '@kubb/plugin-faker'
import {pluginFetch} from '@kubb/plugin-fetch'

export default defineConfig({
  input: '../docs/swagger.yaml',
  output: {
    path: './src/api',
    clean: true,
  },
  plugins: [
    pluginTs({output: {path: 'types'}}),
    pluginReactQuery(),
    pluginZod(),
    pluginFaker(),
    pluginFetch()
  ],
})
