import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login.jsx'
import TransactionList from './Components/TransactionList/TransactionList.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import { useContext, useEffect } from 'react'
import { LoginContext } from './Contexts/LoginContext.jsx'
import TransactionForm from './Components/TransactionForm/TransactionForm.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import tokenNames from './Constants/TokenNames.js'
import { checkAccessTokenValidity , refreshToken} from './RefreshToken.js'
import UserProfile from './Components/UserProfile/UserProfile.jsx'
import SetNewPassword from './Components/SetNewPassword/SetNewPassword'

function App() 
{
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
    },
    {
      path: '/user-profile',
      element: <ProtectedRoute><UserProfile/></ProtectedRoute>
    },
    {
      path: '/set-new-password',
      element: <ProtectedRoute><SetNewPassword/></ProtectedRoute>
    }
  ]);
    const loginContext = useContext(LoginContext);

    useEffect(()=>{
    const fetchToken = async ()=>
    {
      let token = localStorage.getItem(tokenNames.accessToken);

      if(token && checkAccessTokenValidity(token))
      {
        loginContext.setJwt(token);
        loginContext.setAuthenticationStatus(true);
      }
      else
      {
        token = await refreshToken();
        if(token)
        {
          localStorage.setItem(tokenNames.accessToken, token);
          loginContext.setJwt(token);
          loginContext.setAuthenticationStatus(true);
        }
        else
        {
          localStorage.removeItem(tokenNames.accessToken);
          loginContext.setAuthenticationStatus(false);
        }
      }
     }
     fetchToken();    
    },[]);

    return (
      <div>
        {
          loginContext.isAuthenticated!==undefined ? <RouterProvider router={router}></RouterProvider> : <div>Please wait</div>
        }
      </div>
    )
}
export default App
