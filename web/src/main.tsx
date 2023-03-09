import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DialogConsumer, DialogProvider } from '@/common/feedback/Dialog'
import { SnackbarConsumer, SnackbarProvider } from '@/common/feedback/Snackbar'
import ReactQuery from '@/providers/ReactQuery'
import Theme from '@/providers/Theme'
import Routes from '@/routes/Routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './styles/scroll-bar.css'
import './styles/tailwind.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Theme>
      <DialogProvider>
        <SnackbarProvider>
          <ReactQuery>
            <ReactQueryDevtools initialIsOpen={false} />
            <Routes />
            <DialogConsumer />
            <SnackbarConsumer />
          </ReactQuery>
        </SnackbarProvider>
      </DialogProvider>
    </Theme>
  </StrictMode>
)
