import React, { useContext, useState } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

export default function AdminDashboard() 
{
    const initialData = {
        roleId: '',
        userId: ''
    }
    const [formData, setFormData] = useState(initialData);
    const loginContext = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleFocus(event)
    {
        setLoaded(false);
        if(!isFetched)
        {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${loginContext.jwt}`)
            const response = await fetch('http:localhost:5144/api/users/list',{
                method: 'GET',
                headers: headers
            })

            const responseBody = await response.json();

            if(response.ok)
            {
                setIsFetched(true);
                setUsers(responseBody.responseData);
            }
            else
            {
                alert(responseBody.errorName);
            }
        }
        setLoaded(true);
    }

    async function onSubmit(event)
    {   
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${loginContext.jwt}`);
        const response = await fetch('http://localhost:5144/api/roles/user-roles',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(formData)
        })

        if(response.ok)
        {
            alert('Success');
        }
    }

    return (
        <div className='adminDashboard'>
        <h1>Assign Role To User</h1>
        <form onSubmit={onSubmit}>        
                    <div>
                        <div className='roleLabel'>
                        <label htmlFor='Admin'>Admin</label>
                        <input type="radio" name="roleId" value={0} onChange={handleChange} id='Admin'/>
                        </div>
                        <div className='roleLabel'>
                        <label htmlFor='User'>User</label>
                        <input type="radio" name="roleId" value={1} onChange={handleChange} id='User' />
                        </div>
                    </div>

                    <div>
                        <select name='userId' value={formData.userId} onChange={handleChange} onFocus={handleFocus} id='userId'>
                            <option key={0} value="">Select User</option>
                            {loaded? 
                            /* In React, the key attribute is required when rendering lists, including dropdown options, to improve performance and avoid rendering issues but it’s not submitted with the form data. Only the value attribute is submitted.*/
                            users.map((user)=>
                            <option key={user.userId} value={user.userId}>{user.FirstName} {user.LastName}</option>)
                            :
                            <option>Loading...</option>}
                        </select>
                    </div>
                    <input type="submit" value="Submit" id='submit'></input>
                </form>
                <Link to='/add-user' id='linkToAddUser'>Add a new user</Link>
        </div>
    )
}
