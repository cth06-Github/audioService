"use client"; // hmm

import { useState, createContext, useContext } from 'react';

const AuthContext = createContext<any>(null); // cannot null... but supposedly to be null?

export function useAuth() { // hook?
    return useContext(AuthContext);
}

export function AuthProvider({props} : {props: any}) {
    const INVALID: number = 0; // wrong username or password filled in
    const AUTHENTICATED: number = 1; // correct details
    const [authStatus, updateAuthStatus] = useState<number>(INVALID); // actually can Boolean

    const value = { // global. Store in Object
    authStatus,
    updateAuthStatus,
    AUTHENTICATED,
    INVALID,
    }
    
    return (<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>)
}


