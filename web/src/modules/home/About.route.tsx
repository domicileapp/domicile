import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./About'))

const config: RouteConfig = {
  element: <Page />,
  path: 'about',
  parent: 'HomeLayout',
}

export default config
