import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

/**
 * @description Standard way to handle routes in suspense state
 */
export default function RouteChildren() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  )
}
