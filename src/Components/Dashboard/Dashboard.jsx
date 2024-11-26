import React from 'react'
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();
  const handleUserClick = ()=>
    {
        navigate('/transactions')
    }
    const handleAdminClick = ()=>{
      navigate('/admin')
    }
  return (
    <div className='dashboardContainer'>
      <div>
      <div><button className='userTypeButton' onClick={handleAdminClick}>Admin</button></div>
      <div><button className='userTypeButton' onClick={handleUserClick}>User</button></div>
      </div>
    </div>
  )
}
