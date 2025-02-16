import { useContext, useState } from 'react';
// import './Login.css'
import { LoginContext } from '../../Contexts/LoginContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import errorNames from '../../Constants/ErrorMessages.js';
import tokenNames from '../../Constants/TokenNames.js';
import SendOtpModal from '../SendOtpModal/SendOtpModal.jsx';

const Login = () => {
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isModalOpen, setModalOpen] = useState(false);
    async function submitForm(event) {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
            const response = await fetch('http://localhost:5144/api/users/login', {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                headers: myHeaders
            });

            if (response.ok) {
                const payload = await response.json();
                loginContext.setAuthenticationStatus(true);
                loginContext.setJwt(payload.responseData);
                localStorage.setItem(tokenNames.accessToken, payload.responseData);
                navigate('/transactions');
            }
            else {
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            alert(errorNames.SOMETHING_WENT_WRONG)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="mx-2 formContainer">
            <div className="text-center fw-bold fs-3">Login</div>
            <form onSubmit={submitForm}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="email">Enter Your Email Address</label>
                    <input type="text" className='form-control inputField' name="email" id="email" value={formData.email} onChange={handleChange}></input>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="password">Enter Your Password</label>
                    <input className='form-control inputField' type="text" name="password" id="password" value={formData.password} onChange={handleChange}></input>
                </div>
                <input type="submit" className='btn btn-success' value="Submit"></input>
            </form>
            <Link to="#" className='link-opacity-25-hover link-secondary' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setModalOpen(true) }}>Forgot Password?</Link>
            {/* hey */}
            <SendOtpModal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
        </div>
    )
}
export default Login;