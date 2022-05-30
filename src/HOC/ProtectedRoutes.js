import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../ContextApi/auth-context'

const withAuth = (WrappedComponent) => {
    return function ProtectedRoutes(props) {
     
      const auth = useContext(AuthContext)
        if(!auth.status) {
          console.log("nav,", auth.status)
          return <Navigate to="/" replace />;
        }
        return (
          <WrappedComponent />
        )
      }
}

export default withAuth

