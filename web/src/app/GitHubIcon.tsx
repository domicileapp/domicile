import { GitHub } from '@mui/icons-material'
import Help from '@mui/icons-material/Help'
import { IconButton, Tooltip } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function HelpIcon() {
  const location = useLocation()

  // Generate help link
  const helpUrl =
    import.meta.env.VITE_APP_HELP_LINK + encodeURIComponent(location.pathname) ||
    'https://github.com/domicileapp/domicile'

  const handleClick = () => window.open(helpUrl, '_blank')

  return (
    <Tooltip title={'help' as string}>
      <IconButton onClick={handleClick}>
        <GitHub htmlColor='white' />
      </IconButton>
    </Tooltip>
  )
}
