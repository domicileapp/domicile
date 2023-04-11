import { KeyboardDoubleArrowRight, Menu } from '@mui/icons-material'
import {
  AppBar,
  AppBar as MuiNavbar,
  Breadcrumbs,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material'

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Domicile
        </Typography>
        <Button color='inherit' href='/recipes'>
          Recipes
        </Button>
      </Toolbar>
    </AppBar>
  )
}
