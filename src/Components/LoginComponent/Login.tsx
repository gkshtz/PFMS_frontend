import './login.css'
const Login = ()=>{
    return (
       <div className="formContainer">
            <div id="formTitle">Login</div>
            <form>
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