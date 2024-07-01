"use client"
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../lib';


export default function Logout() { 
    return (<button onClick={() => logout()}><LogoutIcon/>Logout</button>)
}

/* if <button onClick={logout} did not work, will give error:
Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported*/