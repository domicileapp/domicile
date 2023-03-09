import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import { AppBar, AppBar as MuiNavbar, Breadcrumbs, Toolbar, Typography } from '@mui/material'

import AccountIcon from './AccountIcon'
import HeaderTitle from './HeaderTitle'
import HelpIcon from './GitHubIcon'
import ModulesIcon from './ModulesIcon'

export default function Header() {
  return (
    <AppBar color='primary'>
      <Toolbar className='flex justify-between w-full'>
        <div className='flex items-center'>
          <ModulesIcon />

          <Typography className='pl-3.5 pr-10' component='h1' variant='h6'>
            Domicile
          </Typography>

          {/* <HeaderTitle /> */}
        </div>
        <nav className='flex space-x-1.5'>
          <HelpIcon />
          <AccountIcon />
        </nav>
      </Toolbar>
    </AppBar>
  )
}
