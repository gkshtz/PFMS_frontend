import React from 'react'
import { useState } from 'react'

export default function SetNewPassword() {
    const initialData = {
        newPassword: "",
        reEnterPassword: ""
    }

    const [formData, setFormData] = useState(initialData);
    const [passwordMatch, setPasswordMatch] = useState(true);

    async function submitForm(event) {
        //login for HTTP request to API
    }

   function onChange(event)
   {
        const {name, value} = event.target;
        setFormData((prev)=>{
            const updatedFormData = {
                ...prev,
                [name]: value
            }
            setPasswordMatch(updatedFormData.newPassword == updatedFormData.reEnterPassword);
            return updatedFormData;
        })
   }

    return (
        <form className='m-4'>
            <div class="mb-3">
                <label for="newPassword" class="form-label">Enter New Pasword</label>
                <input type="password" class="form-control" name='newPassword' id="newPassword" onChange={onChange}/>
                    <div id="passwordHelp" class="form-text text-danger" hidden={passwordMatch}>Password are not same!</div>
            </div>
            <div class="mb-3">
                <label for="reEnterPassword" class="form-label">Re Enter Password</label>
                <input type="password" class="form-control" name='reEnterPassword' id="reEnterPassword" onChange={onChange}/>
            </div>
            <button type="submit" class="btn btn-primary" disabled = {!passwordMatch}>Submit</button>
        </form>
    )
}
 