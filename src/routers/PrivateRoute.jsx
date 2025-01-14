import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {CurrentUser, loading} = useAuth();
    if(loading) {
        return <div>Loading...</div>
    }
    if(CurrentUser){
        return children;
    }
    return <Navigate to = '/login' replace/> 
}

export default PrivateRoute;