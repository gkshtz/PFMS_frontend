import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'

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
      element: <Dashboard />
    }
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
