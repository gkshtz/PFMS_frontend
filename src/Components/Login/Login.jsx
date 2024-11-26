import { useContext, useState } from 'react';
import './Login.css'
import { LoginContext } from '../../Contexts/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';
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
        const response = await fetch('http://localhost:5144/api/users/login',{
            method: 'POST',
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
            localStorage.setItem('jwt-token', payload.responseData);
            navigate('/dashboard');
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