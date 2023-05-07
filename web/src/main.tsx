<<<<<<< HEAD
<<<<<<< HEAD
import { MantineProvider } from '@mantine/core'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './theme/App.css'
import './theme/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
Sentry.init({
  dsn: 'https://fc656eb5384343adba4b54ceda8d26bb@o4505145061801984.ingest.sentry.io/4505145064554496',
  integrations: [new Sentry.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactQuery from '@/providers/ReactQuery'
import Theme from '@/providers/Theme'
import Routes from '@/routes/Routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
=======
import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom'
>>>>>>> a0431e8b (move)

import App from './App'
import './theme/App.css'
import './theme/index.css'

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
<<<<<<< HEAD
>>>>>>> ed5ca8e1 (chore: move folders around)
=======

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
>>>>>>> a0431e8b (move)
