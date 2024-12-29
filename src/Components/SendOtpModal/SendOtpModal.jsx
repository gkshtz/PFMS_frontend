import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import tokenNames from '../../Constants/TokenNames';
import { checkAccessTokenValidity, refreshToken } from '../../RefreshToken';
import { LoginContext } from '../../Contexts/LoginContext';
import './Modal.css';
import { useEffect } from 'react';

export default function SendOtpModal({isModalOpen, setModalOpen}) 
{
    const initialData = {
        emailAddress: ""
    }
    const [emailData, setEmailData] = useState(initialData);

    const [canSendOtp, setCanSendOtp] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isOtpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(()=>{
        setOtpSent(false);
    }, [isModalOpen])

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
                setOtpSent(true);
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

    async function onOtpSubmit(event)
    {
        event.preventDefault();
        try
        {
            const body = {
                emailAddress: emailData.emailAddress,
                otp: otp
            }
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const response = await fetch('http://localhost:5144/api/users/otp/verify', {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: headers,
                credentials: "include"
            })
            if(response.ok)
            {
                alert("otp verified!");
                setModalOpen(false);
            }
            else
            {
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            alert("Something went wrong!");
        }
    }   

    function onOtpChange(event)
    {
        setOtp(event.target.value);
    }

  return (<div>
    {
        isModalOpen ? 
        <div className="modalOverlay">
        <div className="modalContent">
            <h2>Forgot Password</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="forgotEmail">Enter your email:</label><br/>
                <input type="email" id="forgotEmail" name="email" onChange={onChange} required />
                <div className="modalActions">
                    <button type="submit" id='sendBtn' disabled={!canSendOtp}>Send OTP</button>
                    <button type="button" id='cancelBtn' onClick={onClose}>Cancel</button>
                    <div>{!canSendOtp?`Resend OTP in ${timer} seconds.`: null}</div>
                </div>
            </form>
            {isOtpSent ?
                <form onSubmit={onOtpSubmit}>
                    <label htmlFor='otp'>Enter OTP:</label><br/>
                    <input type="number" name='otp' id='otp' onChange={onOtpChange} required/><br/>
                    <input type="submit" id='otpSubmit'/>
                </form> : null
            }  
        </div>
        </div> :  null
    }
    </div>
  )
}
