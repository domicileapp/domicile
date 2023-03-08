import { lazy } from 'react'

import type RouteConfig from '@/routes/RouteConfig'

const Page = lazy(async () => import('./AboutCompany'))

const config: RouteConfig = {
  element: <Page />,
  path: 'about/:info',
  parent: 'HomeLayout',
}

export default config
