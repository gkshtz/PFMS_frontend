import React, { useContext, useEffect, useState } from 'react'
import {LoginContext} from '../../Contexts/LoginContext.jsx';

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

    function handleClick(event)
    {
        const name = event.target.name;
        setIsEditable({
            ...isEditable,
            [name]: true
        });
    }

    function handleChange(event)
    {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function onSubmit(event)
    {
        
    }

    return (
        <div className="formContainer">
      <div id="formTitle">User Profile</div>
            <form onSubmit={onSubmit}>
                <div className='label'>
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div>
                    <input type="text" name="firstName" id="firstName" value={userData.firstName} onChange={handleChange} className='inputField' disabled={!isEditable.firstName}></input>
                    <button type='button' name='firstName' onClick={handleClick}>Edit</button>
                </div>
                <div className='label'>
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div>
                    <input type="text" name="lastName" id="lastName" value={userData.lastName} onChange={handleChange} className='inputField' disabled={!isEditable.lastName}></input>
                    <button type='button' name='lastName' onClick={handleClick}>Edit</button>
                </div>
                <div className='label'>
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input type="text" name="email" id="email" value={userData.email} onChange={handleChange} className='inputField' disabled={!isEditable.email}></input>
                    <button type='button' name='email' onClick={handleClick}>Edit</button>
                </div>
                <div className='label'>
                    <label htmlFor="age">Age</label>
                </div>
                <div>
                    <input type="number" name="age" id="age" value={userData.age} onChange={handleChange} className='inputField' disabled={!isEditable.age}></input>
                    <button type='button' name='age' onClick={handleClick}>Edit</button>
                </div>
                <div className='label'>
                    <label htmlFor="city">City</label>
                </div>
                <div>
                    <input type="text" name="city" id="city" value={userData.city} onChange={handleChange} className='inputField' disabled={!isEditable.city}></input>
                    <button type='button' name='city' onClick={handleClick}>Edit</button>
                </div>           

                <input type="submit" value="Submit" id='submit'></input>
            </form>
    </div>
    )
}
