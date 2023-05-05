import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactQuery from '@/providers/ReactQuery'
import Theme from '@/providers/Theme'
import Routes from '@/routes/Routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './styles/tailwind.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Theme>
      <ReactQuery>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes />
      </ReactQuery>
    </Theme>
  </StrictMode>
)
