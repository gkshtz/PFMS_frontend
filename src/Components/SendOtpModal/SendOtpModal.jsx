import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import tokenNames from '../../Constants/TokenNames';
import { checkAccessTokenValidity, refreshToken } from '../../RefreshToken';
import { LoginContext } from '../../Contexts/LoginContext';
import './Modal.css';

export default function SendOtpModal({isModalOpen, setModalOpen}) 
{
    const initialData = {
        emailAddress: ""
    }
    const [emailData, setEmailData] = useState(initialData);

    const [canSendOtp, setCanSendOtp] = useState(true);
    const [timer, setTimer] = useState(0);

    const onChange = (event)=>{
        setEmailData({
            emailAddress: event.target.value
        });
    }

    const onClose = ()=>{
        setModalOpen(false);
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        setTimer(30);
        setCanSendOtp(false);
        try{

            const countdownId = setInterval(()=>{
                setTimer((prev)=>{
                    if(prev<=1)
                    {
                        clearInterval(countdownId);
                        setCanSendOtp(true);
                        return 0;
                    }
                    else
                    {
                        return prev-1;
                    }
                })
            }, 1000)

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const response = await fetch('http://localhost:5144/api/users/otp/send', {
                method: "POST",
                body: JSON.stringify(emailData),
                headers: headers,
                credentials: "include"
            })
            if(response.ok)
            {
                alert("OTP send!");
            }
            else
            {
                setTimer(0);
                setCanSendOtp(true);
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            setTimer(0);
            setCanSendOtp(true);
            alert("Something went wrong!");
        }
    }
  return (<div>
    {
        isModalOpen ? 
        <div className="modalOverlay">
        <div className="modalContent">
            <h2>Forgot Password</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="forgotEmail">Enter your email:</label>
                <input type="email" id="forgotEmail" name="email" onChange={onChange} required />
                <div className="modalActions">
                    <button type="submit" disabled={!canSendOtp}>Send OTP</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                    <div>{!canSendOtp?`Resend OTP in ${timer} seconds.`: null}</div>
                </div>
            </form>
        </div>
        </div> :  null
    }
    </div>
  )
}