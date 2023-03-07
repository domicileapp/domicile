import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='Home'>
      <Navbar />
      <Typography variant='h2'>Home</Typography>
    </div>
  )
}

export default Home
