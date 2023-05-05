import { Divider, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export type MainContentProps = {
  header?: string
}

export default function MainContent({ children, header }: PropsWithChildren<MainContentProps>) {
  return <div>{children}</div>
}
