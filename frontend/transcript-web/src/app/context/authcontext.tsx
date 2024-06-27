/*probably won't be using this*/

"use client"; // hmm

import { useState, createContext, useContext } from 'react';

interface ContextAuthType {
    authStatus: number;
    updateAuthStatus: React.Dispatch<React.SetStateAction<number>>;
    INVALID: number;
    AUTHENTICATED: number;
}
  
const AuthContext = createContext<ContextAuthType | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({children}) => { // not sure what type
    const INVALID: number = 0; // wrong username or password filled in
    const AUTHENTICATED: number = 1; // correct details
    const [authStatus, updateAuthStatus] = useState<number>(INVALID); // actually can Boolean
  
    return (
        <AuthContext.Provider value={{authStatus, updateAuthStatus, INVALID, AUTHENTICATED}}>
            {children}
        </AuthContext.Provider>)
}

/* Trick to catch errors? */
export const useAuthContext = () => {
    const localAuthContext = useContext(AuthContext);
    if (localAuthContext === undefined) {
      throw new Error('useAuthContext must be inside an AuthProvider');
    }
    return localAuthContext; // return useContext(AuthContext)
};


/*
const value = { // global. Store in Object
    authStatus,
    updateAuthStatus,
    AUTHENTICATED,
    INVALID,
    }

export function useAuth() { // hook?
    return useContext(AuthContext);
}
*/


