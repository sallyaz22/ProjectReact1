import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    // const navigate = useNavigate();
    const token = localStorage.getItem('userToken')

    if(!token){
      return  <Navigate to='/signin' replace/>
    }
  return children (
    <div>please signIn/Register in Your Account</div>
  )
}
