import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./UserSettings'))

const config: RouteConfig = {
  element: <Page />,
  path: 'users',
  parent: 'ConfigurationLayout',
}

export default config
