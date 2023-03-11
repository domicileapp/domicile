import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import useToggle from '@/common/form/useToggle'
import Link from '@/common/navigation/Link'

import Apps from '@mui/icons-material/Apps'
import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import Blender from '@mui/icons-material/Blender'

export default function ModulesIcon() {
  const [open, toggle] = useToggle()

  return (
    <>
      <IconButton onClick={toggle}>
        <Apps />
      </IconButton>
      <Drawer onClose={toggle} open={open}>
        <List onClick={toggle}>
          <Link href='/'>
            <ListItemButton>
              <ListItemIcon>
                <Home color='primary' />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </Link>
          <Link href='/recipes'>
            <ListItemButton>
              <ListItemIcon>
                <Blender color='primary' />
              </ListItemIcon>
              <ListItemText primary='Recipes' />
            </ListItemButton>
          </Link>
          <Link href='/configuration'>
            <ListItemButton>
              <ListItemIcon>
                <Settings color='primary' />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </>
  )
}
