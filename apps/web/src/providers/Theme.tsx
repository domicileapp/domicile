import { Color, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import type { PropsWithChildren } from 'react'

declare module '@mui/material/styles' {
  interface TypeBackground {
    grey: string
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    // Cannot seem to get this to work
    background: {
      default: '#f5f5f5',
    },
  },
  spacing: 8,
})

export default function Theme({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
