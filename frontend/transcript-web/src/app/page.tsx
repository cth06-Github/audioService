"use client"
//import { useAuthContext, AuthProvider } from './context/authcontext'
//import Login from './login/page'
//import Upload from './upload/page'
import { useRouter, redirect } from 'next/navigation';


export default function Page() {
  useRouter().push('/login');
}

/*
  <AuthProvider>
    <Login></Login>
    <Upload></Upload>
  </AuthProvider> 
*/
// <Link href="/Upload"> Login </Link> KEEP IN VIEW.

