import React, { useContext, useEffect, useState } from 'react'
import {LoginContext} from '../../Contexts/LoginContext.jsx';
import {checkAccessTokenValidity, refreshToken} from '../../RefreshToken.js';
import tokenNames from '../../Constants/TokenNames.js';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() 
{
    var initialData = {
        firstName:"",
        lastName:"",
        email:"",
        age:0,
        city:""
    }

    var inititalIsEditable = {
        firstName: false,
        lastName: false,
        email: false,
        age: false,
        city: false
    }

    const [isEditable, setIsEditable] = useState(inititalIsEditable);
    const [userData, setUserData] = useState(initialData);
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserData = async ()=>{
            try
            {
                const response = await fetch('http://localhost:5144/api/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${loginContext.jwt}`,
                        "Content-Type": "application/json"
                    }
                })
                if(response.ok)
                {
                    const payload = await response.json();
                    setUserData(payload.responseData);
                }
                else
                {
                    const payload = await response.json();
                    alert(payload.ErrorName);
                }
            }
            catch
            {
                alert("Something wen wrong!");
            }
        }
        fetchUserData();
    }, [])

    function handleEditClick(event)
    {
        const name = event.target.name;
        setIsEditable({
            ...isEditable,
            [name]: true
        });
    }

    function handleChange(event)
    {
        let {name, value} = event.target;
        if(name == "age")
        {
            value = Number(value);
        }
        setUserData({
            ...userData,
            [name]: value
        });
    }

    async function onSubmit(event)
    {
        event.preventDefault();
        try
        {
            let token = loginContext.jwt;
            if(!checkAccessTokenValidity(token))
            {
                token = await refreshToken();
                if(token)
                {
                    loginContext.setJwt(token);
                    localStorage.setItem(tokenNames.accessToken, token);
                }
                else
                {
                    loginContext.setJwt('');
                    loginContext.setAuthenticationStatus(false);
                    localStorage.removeItem(tokenNames.accessToken);
                    navigate('/login');
                }
            }

            const response = await fetch('http://localhost:5144/api/users/profile', {
                method: 'PATCH',
                body: JSON.stringify(userData),
                headers: {
                    Authorization: `Bearer ${loginContext.jwt}`,
                    "Content-Type": 'application/json'
                }
            })

            if(response.ok)
            {
                alert("Profile updated!");
            }
            else
            {
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            alert("Something went wrong!");
        }
    }

    function handleSaveClick(event)
    {
        const { name } = event.target;
        setIsEditable({
           ...isEditable,
           [name]: false 
        })
    }

    async function handleLogoutClick()
    {
        try
        {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${loginContext.jwt}`)
            const response = await fetch("http://localhost:5144/api/users/refresh-token/logout", {
                method: "POST",
                credentials: "include",
                headers: headers
            })
            if(response.ok)
            {
                localStorage.removeItem(tokenNames.accessToken);
                navigate('/login');
            }
        }
        catch
        {
            alert("Something went wrong!!!");
        }
    }

    return (
        <div>
            <div id='logoutContainer'><button id='logoutButton' onClick={handleLogoutClick}>Logout</button></div>
        <div className="formContainer">
      <div id="formTitle">User Profile</div>
            <form onSubmit={onSubmit}>
                <div className='label'>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div>
                    <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleChange} className='inputField' disabled={!isEditable.firstName}></input>
                    <button type='button' name='firstName' onClick={handleEditClick}>Edit</button>
                    <button type='button' name='firstName' onClick={handleSaveClick}>Save</button>
                </div>
                <div className='label'>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div>
                    <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={handleChange} className='inputField' disabled={!isEditable.lastName}></input>
                    <button type='button' name='lastName' onClick={handleEditClick}>Edit</button>
                    <button type='button' name='lastName' onClick={handleSaveClick}>Save</button>
                </div>
                <div className='label'>
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input type="text" name="email" id="email" value={userData.email} onChange={handleChange} className='inputField' disabled={!isEditable.email}></input>
                    <button type='button' name='email' onClick={handleEditClick}>Edit</button>
                    <button type='button' name='email' onClick={handleSaveClick}>Save</button>
                </div>
                <div className='label'>
                    <label htmlFor="age">Age</label>
                </div>
                <div>
                    <input type="number" name="age" id="age" value={userData.age} onChange={handleChange} className='inputField' disabled={!isEditable.age}></input>
                    <button type='button' name='age' onClick={handleEditClick}>Edit</button>
                    <button type='button' name='age' onClick={handleSaveClick}>Save</button>
                </div>
                <div className='label'>
                    <label htmlFor="city">City</label>
                </div>
                <div>
                    <input type="text" name="city" id="city" value={userData.city} onChange={handleChange} className='inputField' disabled={!isEditable.city}></input>
                    <button type='button' name='city' onClick={handleEditClick}>Edit</button>
                    <button type='button' name='city' onClick={handleSaveClick}>Save</button>
                </div>           

                <input type="submit" value="Submit" id='submit'></input>
            </form>
    </div>
    </div>
    )
}
