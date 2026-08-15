// import { pluginFaker } from '@kubb/plugin-faker'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  root: '..',
  input: 'docs/swagger.yaml',
  output: {
    path: 'web/src/api',
    clean: true,
    lint: 'oxlint',
    format: 'oxfmt',
  },
  plugins: [
    pluginTs({
      output: {
        path: 'types',
        mode: 'directory',
        barrel: { type: 'named' },
      },
    }),
    pluginReactQuery({
      output: {
        path: 'hooks',
        mode: 'directory',
      },
      client: 'axios',
    }),
    pluginZod({
      output: {
        path: 'zod',
        mode: 'directory',
      },
    }),
    // pluginFaker({
    //   output: { path: 'mocks' },
    //   seed: [100],
    // }),
    pluginAxios({
      output: {
        path: 'clients',
        mode: 'directory',
      },
    }),
  ],
})
