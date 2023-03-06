import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tasks from '@/pages/Tasks'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { ThemeProvider, useTheme } from '@mui/system'
import theme from './common/theme'

function App() {
  const customTheme = useTheme(theme)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
