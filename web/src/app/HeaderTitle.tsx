import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Breadcrumbs, Typography } from '@mui/material'

import { useLayoutState } from './Layout'

export default function HeaderTitle() {
  const layout = useLayoutState()

  return (
    <Breadcrumbs color='white' separator={<KeyboardDoubleArrowRight />}>
      <Typography className='pl-3.5' color='white' component='h1' variant='h6'>
        Domicile
      </Typography>
      {layout.currentModule && (
        <Typography component='h2' color='white' variant='h6'>
          {layout.currentModule}
        </Typography>
      )}
    </Breadcrumbs>
  )
}
