import { useContext } from 'react';
import './login.css'
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
const Login = ()=>{

    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();
    async function submitForm(event: React.FormEvent)
    {
        event.preventDefault();
        type response = {
            statusCode: number;
            responseData: string
            responseMessage: string;
        }
        console.log("hey");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch('http://localhost:5144/api/users/login',{
            method: 'POST',
            body: JSON.stringify({
                email: "kshitiz@gmail.com",
                password: "kshitiz123"                
            }),
            headers: myHeaders
        });

        if(response.ok)
        {
            const payload: response = await response.json();
            loginContext!.setAuthenticationStatus(true);
            loginContext!.setJwt(payload.responseData);
            navigate('/dashboard');
        }
    }

    return (
       <div className="formContainer">
            <div id="formTitle">Login</div>
            <form onSubmit={submitForm}>
                <div className='label'>
                    <label htmlFor="name">Enter Your Email Address</label>
                </div>
                <div>
                    <input type="text" name="email" id="name" className='inputField'></input>
                </div>
                <div className='label'>
                    <label htmlFor="password">Enter Your Password</label>
                </div>
                <div>
                    <input type="text" name="password" id="password" className='inputField'></input>
                </div>           
                <input type="submit" value="Submit" id='submit'></input>
            </form>
       </div>
    )
}
export default Login;