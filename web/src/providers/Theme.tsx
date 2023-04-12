import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import type { PropsWithChildren } from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
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
