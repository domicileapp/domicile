import { createTheme, ThemeOptions, useTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
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
}

const theme = createTheme(themeOptions)

export default theme
