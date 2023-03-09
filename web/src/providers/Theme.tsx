import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import type { PropsWithChildren } from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2F243A',
    },
    secondary: {
      main: '#6a8d73',
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
