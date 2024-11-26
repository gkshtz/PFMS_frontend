import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login.jsx'
import TransactionList from './Components/TransactionList/TransactionList.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import { useContext } from 'react'
import { LoginContext } from './Contexts/LoginContext.jsx'
import TransactionForm from './Components/TransactionForm/TransactionForm.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'

function App() {
  const {isAuthenticated} = useContext(LoginContext);
    
  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated? <Dashboard/>: <Navigate to='/login' />
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
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
