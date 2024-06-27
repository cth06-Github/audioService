import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../context/authcontext' 

export default function Logout() { 
    const {authStatus, updateAuthStatus, AUTHENTICATED, INVALID} = useAuthContext();
    const router = useRouter();
    const logout = () => {
        router.push('/login'); //cannotr useRouter().push('/login');
        updateAuthStatus(INVALID);
    }
    
    return (<button onClick={logout}><LogoutIcon/>Logout</button>)
}