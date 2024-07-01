"use client"
import { useRouter, redirect } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { cookies } from "next/headers";
import { useAuthContext } from '../context/authcontext' 
import { logout1 } from '../lib';


export default function Logout() { // what happens if async button....will it affect functionality of the website?
    //const {authStatus, updateAuthStatus, AUTHENTICATED, INVALID} = useAuthContext();
    const router = useRouter();
    
    const logout = () => {
        logout1();
        //cookies().set("session", "", { expires: new Date(0) });
        router.push('/login'); //cannotr useRouter().push('/login');
    }
    
    return (<button onClick={logout}><LogoutIcon/>Logout</button>)
}