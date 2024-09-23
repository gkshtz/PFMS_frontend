import { createContext, ReactNode, useState } from "react";

interface Value{
    isAuthenticated: boolean;
    jwt: string;
    setAuthenticationStatus: Function;
    setJwt: Function
}

export const LoginContext = createContext<undefined|Value>(undefined);

export const LoginProvider = ({children}:{children: ReactNode})=>{
    const [isAuthenticated, setAuthenticationStatus] = useState(false);
    const [jwt, setJwt] = useState('');

    const data: Value = {
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