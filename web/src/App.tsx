import { useState } from 'react'
import MyNavigationComponent from './components/layout/MyNavigationComponent'
import './theme/App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    // Wrap your app with the plugins configuration if it is necessary
    // <ReactQueryProvider>
    //    <AuthenticationState>

    <div className='App'>
      <MyNavigationComponent />
    </div>
    //       </Router>
    //    </AuthenticationState>
    // </ReactQueryProvider>
  )
}

export default App
