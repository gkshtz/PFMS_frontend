import React from 'react'
import { useState } from 'react'

export default function SetNewPassword() 
{
    const initialData = {
        newPassword:"",
        reEnterPassword:""
    }

    const [formData, setFormData] = useState(initialData);

    const onChange = async (event)=>{
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    async function submitForm(event)
    {
        //login for HTTP request to API
    }

  return (
    <div>
      <div className="formContainer">
            <div id="formTitle">Login</div>
            <form onSubmit={submitForm}>
                <div className='label'>
                    <label htmlFor="newPassword">Enter New Password</label>
                </div>
                <div>
                    <input type="text" name="newPassword" id="newPassword" value={formData.newPassword} onChange={onChange} className='inputField'></input>
                </div>
                <div className='label'>
                    <label htmlFor="reEnterPassword">Re Enter New Password</label>
                </div>
                <div>
                    <input type="text" name="reEnterPassword" id="reEnterPassword" value={formData.reEnterPassword} 
                    onChange={onChange} className='inputField'></input>
                </div>           
                <input type="submit" value="Submit" id='submit'></input>
            </form>
       </div>
    </div>
  )
}
