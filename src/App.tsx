import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/LoginComponent/Login'
import Dashboard from './Components/DashboardComponent/Dashboard'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    }
  ])
  
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
