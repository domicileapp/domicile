import React, { useEffect, useState } from 'react'
import * as AuthService from '@/services/auth.service'
import EventBus from '@/common/EventBus'
import { Link } from 'react-router-dom'

const Tasks: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) setCurrentUser(user)

    EventBus.on('logout', logout)

    return () => {
      EventBus.remove('logout', logout)
    }
  }, [])
  const logout = () => {
    AuthService.logout()
  }
  return (
    <div>
      {currentUser && <li>current user</li>}
      {currentUser ? (
        <div className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link to={'/profile'} className='nav-link'>
              {currentUser.username}
            </Link>
          </li>
          <li className='nav-item'>
            <a href='/login' className='nav-link' onClick={logout}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link to={'/login'} className='nav-link'>
              Login
            </Link>
          </li>
        </div>
      )}
    </div>
  )
}

export default Tasks
