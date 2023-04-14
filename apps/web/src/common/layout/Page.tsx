import { styled } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'

export interface PageProps {}

const PageRoot = styled('div')(() => ({
  display: 'flex',
  minHeight: 'inherit',
}))

export default function PageWithNavigationSidebar({ children }: PropsWithChildren<PageProps>) {
  return (
    <PageRoot>
      <Suspense>{children}</Suspense>
    </PageRoot>
  )
}
