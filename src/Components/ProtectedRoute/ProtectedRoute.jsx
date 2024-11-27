import React, { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) 
{
    const {isAuthenticated} = useContext(LoginContext);
    return isAuthenticated ? children : <Navigate to="/login"/>
}
