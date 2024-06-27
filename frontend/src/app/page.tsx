"use client"
//import { useAuthContext, AuthProvider } from './context/authcontext'
//import Login from './login/page'
//import Upload from './upload/page'
import { useRouter } from 'next/navigation';


export default function Page() {
  const router = useRouter();
  router.push('/login');
}

/*
  <AuthProvider>
    <Login></Login>
    <Upload></Upload>
  </AuthProvider> 
*/
// <Link href="/Upload"> Login </Link> KEEP IN VIEW.

