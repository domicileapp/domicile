import { Suspense } from 'react'
import { Outlet } from 'react-router'
import LoadingPage from 'src/pages/Loading'

const LayoutPrivate = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  )
}

export default LayoutPrivate
