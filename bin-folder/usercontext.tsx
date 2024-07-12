// DIDN'T WORK....I DON'T KNOW WHY //
/*
"use client"; // hmm
import { createContext, useContext, useState } from 'react';

interface UserType {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
} 

export const UserContext2 = createContext<string | undefined>("000");


const UserContext = createContext<UserType | undefined>(undefined);

export const UserProvider: React.FC<any> = ({children}) => { // not sure what type
    const [username, setUsername] = useState<string>(""); 
    return (
        <UserContext.Provider value={{username, setUsername}}>
            {children}
        </UserContext.Provider>)
} 

export const useUserContext = () => {
    const localUserContext = useContext(UserContext2);
    if (localUserContext === undefined) {
      throw new Error('useContext must be inside a Provider');
    }
    return localUserContext; // return useContext(AuthContext)
};*/
