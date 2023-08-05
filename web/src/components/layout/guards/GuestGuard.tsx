import { FC, ReactElement } from 'react'

interface IGuestGuardProps {
  children: ReactElement
}

const GuestGuard: FC<IGuestGuardProps> = ({ children }) => {
  // const { isAuthenticated, isLoading } = useContext(AuthenticationContext);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  // if (isAuthenticated) {
  //   return <Navigate to="/app/home" />;
  // }

  return children
}

export default GuestGuard
