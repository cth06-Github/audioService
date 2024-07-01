"use client"
//import { useAuthContext, AuthProvider } from './context/authcontext'
//import Login from './login/page'
//import Upload from './upload/page'
import { redirect } from 'next/navigation';


export default function Page() {
  redirect('/login');
}

/*
  <AuthProvider>
    <Login></Login>
    <Upload></Upload>
  </AuthProvider> 
*/
// <Link href="/Upload"> Login </Link> KEEP IN VIEW.

