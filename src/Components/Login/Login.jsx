import { useContext, useState } from 'react';
import './Login.css'
import { LoginContext } from '../../Contexts/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';
import errorNames from '../../Constants/ErrorMessages.js';
import tokenNames from '../../Constants/TokenNames.js';

const Login = ()=>{
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    async function submitForm(event)
    {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try{
            const response = await fetch('http://localhost:5144/api/users/login',{
                method: 'POST',
                credentials:"include",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password                
                }),
                headers: myHeaders
            });
    
            if(response.ok)
            {
                const payload = await response.json();
                loginContext.setAuthenticationStatus(true);
                loginContext.setJwt(payload.responseData);
                localStorage.setItem(tokenNames.accessToken, payload.responseData);
                navigate('/transactions');
            }
            else
            {
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            alert(errorNames.SOMETHING_WENT_WRONG)
        }
    }

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
       <div className="formContainer">
            <div id="formTitle">Login</div>
            <form onSubmit={submitForm}>
                <div className='label'>
                    <label htmlFor="email">Enter Your Email Address</label>
                </div>
                <div>
                    <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} className='inputField'></input>
                </div>
                <div className='label'>
                    <label htmlFor="password">Enter Your Password</label>
                </div>
                <div>
                    <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} className='inputField'></input>
                </div>           
                <input type="submit" value="Submit" id='submit'></input>
            </form>
       </div>
    )
}
export default Login;