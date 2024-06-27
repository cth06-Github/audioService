"use client"; // inform nextJS this is client component; in order to import useState... 

// import Image from "next/image";
import styles from './login.module.css'; 
//import { getSession, login, logout } from "../lib.ts";
import Login from './login';
import { AuthProvider } from '../context/authcontext'

export default function LoginPage() { // to add ASYNC? but warning -- cannot for client components
  //const session = await getSession();
  
  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <h1>Transcription Service</h1>
        <AuthProvider>
          <Login></Login>
        </AuthProvider>
    </div>
    
  );
}