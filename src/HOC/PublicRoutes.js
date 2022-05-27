import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const withLoged = (WrappedComponent) => {
    return function PublicRoutes(props) {
      console.log("login,", props.authenticated)
        if(props.authenticated) {
          console.log("nav,", props.authenticated)
          return <Navigate to="/home/profile" replace />;
        }
        return (
          <WrappedComponent />
        )
      }
}

export default withLoged

