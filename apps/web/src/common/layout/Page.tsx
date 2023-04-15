import { styled } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { Suspense } from 'react'

export interface PageProps {}

export default function PageWithNavigationSidebar({ children }: PropsWithChildren<PageProps>) {
  return <Suspense>{children}</Suspense>
}
