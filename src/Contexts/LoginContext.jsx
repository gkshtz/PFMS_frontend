import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({children})=>{
    const [isAuthenticated, setAuthenticationStatus] = useState(false);
    const [jwt, setJwt] = useState('');

    const data = {
        isAuthenticated,
        jwt, 
        setAuthenticationStatus, 
        setJwt
    }

    return (
        <LoginContext.Provider value={data}>
            {children}
        </LoginContext.Provider>
    )
}