import Apps from '@mui/icons-material/Apps'
import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import useToggle from '@/common/form/useToggle'
import Link from '@/common/navigation/Link'
import { CottageRounded } from '@mui/icons-material'

export default function ModulesIcon() {
  const [open, toggle] = useToggle()

  return (
    <>
      <IconButton onClick={toggle}>
        <Apps />
      </IconButton>
      <Drawer onClose={toggle} open={open}>
        <CottageRounded />
        <List onClick={toggle}>
          <Link href='/'>
            <ListItemButton>
              <ListItemIcon>
                <Home color='secondary' />
              </ListItemIcon>
              <ListItemText primary='Index' />
            </ListItemButton>
          </Link>
          <Link href='/configuration'>
            <ListItemButton>
              <ListItemIcon>
                <Settings color='primary' />
              </ListItemIcon>
              <ListItemText primary='Configuration' />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </>
  )
}
