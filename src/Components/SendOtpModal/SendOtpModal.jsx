import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import tokenNames from '../../Constants/TokenNames';
import { checkAccessTokenValidity, refreshToken } from '../../RefreshToken';
import { LoginContext } from '../../Contexts/LoginContext';
import './Modal.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SendOtpModal({ isModalOpen, setModalOpen }) {
    const initialData = {
        emailAddress: ""
    }
    const [emailData, setEmailData] = useState(initialData);

    const [canSendOtp, setCanSendOtp] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isOtpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        setOtpSent(false);
    }, [isModalOpen])

    const onChange = (event) => {
        setEmailData({
            "emailAddress": event.target.value
        });
    }

    const onClose = () => {
        setModalOpen(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setTimer(30);
        setCanSendOtp(false);
        try {
            const countdownId = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownId);
                        setCanSendOtp(true);
                        return 0;
                    }
                    else {
                        return prev - 1;
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
            if (response.ok) {
                setOtpSent(true);
                alert("OTP sent!");
            }
            else {
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

    async function onOtpSubmit(event) {
        event.preventDefault();
        try {
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
            if (response.ok) {
                alert("otp verified!");
                setModalOpen(false);
                loginContext.setAuthenticationStatus(true);
                navigate("/set-new-password");
            }
            else {
                const payload = await response.json();
                alert(payload.ErrorName);
            }
        }
        catch
        {
            alert("Something went wrong!");
        }
    }

    function onOtpChange(event) {
        setOtp(event.target.value);
    }

    return (<div>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Forgot Password</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="emailAddress" className="form-label">Email address</label>
                                <input type="email" name='emailAddress' onChange={onChange} className="form-control" id="emailAddress" aria-describedby="emailHelp" />
                            </div>
                        </form>
                        {
                            
                            isOtpSent?
                                <form onSubmit={onOtpSubmit}>
                                    <label htmlFor='otp' className='form-label'>Enter OTP</label><br />
                                    <input type="number" className='form-control' name='otp' onChange={onOtpChange} required /><br />
                                    <input type="submit" className='btn btn-success' />
                                </form>:null 
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                        {canSendOtp ?
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Send OTP</button>
                            : <button type="button" className="btn btn-primary" disabled>{timer}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>)

}
