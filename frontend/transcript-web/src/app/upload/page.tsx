"use client";

//import Image from "next/image";
//import Link from 'next/link';
import styles from "./upload.module.css"; 
import { useRouter, redirect } from 'next/navigation';
import { AuthProvider } from '../context/authcontext'
import Logout from '../components/logout';
import AudioRecorder from './recordaudio'
import UploadFile from './uploadfile'


export default function UploadPage() {
  const router = useRouter();
     
  /*
  useLayoutEffect(() => { // problem: FOUC
    const isAuth = isAuthenticated;
    if(!isAuth){
      redirect("/login")
    }
  }, [])
  */
  //console.log("my auth upup" + authStatus);

  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <header className={styles.header}>
          <h1>Transcribe now!</h1>
          <AuthProvider><Logout/></AuthProvider>
        </header>
        <p>Either record or upload existing audio!</p>


        <div className={styles.serviceBox}>
            <div className={styles.serviceStream}> 
                <h2>Record</h2>
                <AudioRecorder downloadType = "audio/mpeg"></AudioRecorder>
            </div>

            <div className={styles.serviceFiles}> 
                <h2>Upload</h2>
                <p>1 file only</p>
                <UploadFile></UploadFile>
            </div>
        </div>

        <footer>
            <p>to insert footer?</p>
        </footer> 
    </div>
  );
}
