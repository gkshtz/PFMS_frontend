import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login.jsx'
import TransactionList from './Components/TransactionList/TransactionList.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import { useContext, useEffect } from 'react'
import { LoginContext } from './Contexts/LoginContext.jsx'
import TransactionForm from './Components/TransactionForm/TransactionForm.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';

function App() 
{
    const loginContext = useContext(LoginContext);

    useEffect(()=>{
      const token = localStorage.getItem('jwt-token');
      if(token)
      {
        loginContext.setAuthenticationStatus(true);
        loginContext.setJwt(token);
      }
      else
      {
        loginContext.setAuthenticationStatus(false);
      }
    },[])

    const router = createBrowserRouter([
      {
        path: '/',
        element: <ProtectedRoute><Dashboard/></ProtectedRoute>
      },
      {
        path: 'admin-dashboard',
        element: <ProtectedRoute><AdminDashboard/></ProtectedRoute>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/transactions',
        element: <ProtectedRoute><TransactionList/></ProtectedRoute>
      },
      {
        path: '/add-transaction',
        element: <ProtectedRoute><TransactionForm/></ProtectedRoute>
      }
    ])

    return (
      <div>
        {
          loginContext.isAuthenticated!==undefined ? <RouterProvider router={router}></RouterProvider> : <div>Please wait</div>
        }
      </div>
    )
}

export default App
