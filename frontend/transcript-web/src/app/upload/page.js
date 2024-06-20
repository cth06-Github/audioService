"use client";

//import Image from "next/image";
//import Link from 'next/link';
import styles from "./upload.module.css"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import RecorderApp from '../components/record.js';
import AudioRecorder from '../components/recordaudio.js'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Upload() {
  const router = useRouter();
  const [theFile, chooseFile] = useState(null); // good to use null?
  const [isFileUploaded, updateUploadStatus] = useState(false);

  const handleFileChange = (event) => {
      // Update the state with the selected file
      chooseFile(event.target.files[0]); // TO CHECK WHAT IS EVENT.TARGET.FILES[0]...APA ARRAY?
      console.log(theFile);
  };

  const uploadFunction = async () => {
        console.log("exec, the file uploaded is: ");
        console.log(theFile);
        updateUploadStatus(true); // update inputValue variable with event.target.value
        // NEVER event.preventDefault(); 

        // Implement if got backend
        /*try { //THIS IS GETTING VERY WEIRD...
            const formData = new FormData(); // CHECK WHAT IS FormData()?  
            formData.append("file", theFile); // WHAT IS THE ENCODING LIKE FOR MULTIPART FILES?
            await fetch("http://localhost:5000/uploadfile", { 
                method: "POST",
                //headers: { // tell the server we're sending JSON
                  //  "Content-Type": "multipart/form-data" //multipart/form-data
                //},
                body: formData
              }).then(response => response.json()) // consider catching errors...
            //.then((data) => { // MUST HAVE THIS .THEN(DATA) LINE OF CODE, OTHERWISE FETCH ERROR. WHY?
              //    console.log("File uploaded successfully:", data);
              //})
            console.log("maybe maybe")
        } catch (error) {
            console.log("Error error")
        }*/
        
        setTimeout(() => {
            chooseFile(null); // hmmm
            updateUploadStatus(false);
            }, 900); // 7 seconds

    };

    const truncateName = (fileName) => {
      const length = fileName.length;
      const frontPart = fileName.substring(0, 20);
      const backPart = fileName.substring(length - 8, length)
      return frontPart + "..." + backPart;
    }
  
  // to check what are the possible audio files extension
  return ( // don't want main.....styles.main or styles.description
    <div className={styles.main}>
        <header className={styles.header}>
          <h1>Transcribe now!</h1>
          <button onClick={() => router.push('/login')}><LogoutIcon/>Logout</button>
        </header>
        <p>Either record or upload existing audio!</p>


        <div className={styles.serviceBox}>
            <div className={styles.serviceStream}> 
                <h2>Record</h2>
                <AudioRecorder></AudioRecorder>
            </div>

            <div className={styles.serviceFiles}> 
                <h2>Upload</h2>
                <p>Only Audio files</p>
                <label htmlFor="getAudio">
                    <FileUploadIcon style = {{fontSize:30, color: "#434343"}}/>
                    Audio
                </label>
                <input 
                  id = "getAudio"
                  type ="file" 
                  accept = ".mp3, .wav, .mid, .ogg" 
                  onChange={handleFileChange} 
                  style= {{display:"none"}}
                />
                {theFile ? <p><small>{truncateName(theFile.name)}</small></p> : <p><small>No file chosen</small></p>}

                {theFile && <button onClick={uploadFunction}>
                  Confirm
                </button>}
                
                {isFileUploaded && <p style = {{alignItems: "center"}}><small><CheckCircleOutlineIcon style = {{alignItems: "center", color: "#00F01C"}}/> File Sent!</small></p>}

            </div>
            
        </div>

        <footer>
            <p>to insert footer?</p>
        </footer> 
    </div>
  );
}
