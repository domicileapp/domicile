import { Typography } from '@mui/material'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='Home'>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Typography variant='h2'>Home View</Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adip.
        </Typography>
      </div>
    </div>
  )
}

export default Home
