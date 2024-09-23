import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/LoginComponent/Login'

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>
    }
  ])
  
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
