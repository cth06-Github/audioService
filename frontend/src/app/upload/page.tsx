//import Image from "next/image";
//import Link from 'next/link';
import styles from "./upload.module.css"; 
//import { AuthProvider } from '../context/authcontext'
import Logout from '../components/logout';
import AudioRecorder from './recordaudio'
import UploadFile from './uploadfile'
import { cookies } from "next/headers";



export default async function UploadPage() {
  // const session = await getSession() <--- why need to getSession()? What does it exactly mean?
  const authCookies = await cookies().get("session"); 
  if (authCookies === undefined)  {return <p style = {{textAlign: "center"}}>unauthorised</p>;}
  
  return ( 
    <div className={styles.main}>
        <header className={styles.header}>
          <h1>Transcribe now!</h1>
          <Logout/>
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
