import { useState } from 'react'
import './App.css'
import { MyButton } from './components'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    // Wrap your app with the plugins configuration if it is necessary
    // <ReactQueryProvider>
    //    <AuthenticationState>
    //       <Router>
    <div className='App'>
      <header className='App-header'>
        <p>Hello Vite + React 2!</p>
        <p>
          <button type='button' onClick={() => setCount((prevCount) => prevCount + 1)}>
            count is: {count}
          </button>
        </p>
        {count > 0 ? (
          <p>
            <code>The count is now: {count}</code>
          </p>
        ) : null}
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
        <MyButton />
        <h1 className='text-3xl font-bold'>Hello world!</h1>
        {/* Put your navigation component which will load all the routes */}
        {/* <MyNavigationComponent /> */}
      </header>
    </div>
    //       </Router>
    //    </AuthenticationState>
    // </ReactQueryProvider>
  )
}

export default App
