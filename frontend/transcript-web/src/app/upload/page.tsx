"use client";

//import Image from "next/image";
//import Link from 'next/link';
import styles from "./upload.module.css"; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import RecorderApp from '../components/record.js';
import AudioRecorder from '../components/recordaudio.tsx'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingSign from '../components/loading.tsx'


export default function Upload() {
  const router = useRouter();
  const [theFile, chooseFile] = useState<File | null>(null); // good to use null?
  const [isFileUploaded, updateUploadStatus] = useState<boolean>(false);
  const [progress, setProgress] = useState(10);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { // to check the type later
      // Update the state with the selected file

      // Reselect same file hmm

      if (!event.target.files) {return;} // AMAZING....
      chooseFile(event.target.files[0]); // TO CHECK WHAT IS EVENT.TARGET.FILES[0]...APA ARRAY?
      console.log("file file uploaded:");
      console.log(theFile);
  };

  const deleteFile = () => {
    chooseFile(null);
    // need to think of a way to clear the input event listner...
  }

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
            }, 7000); // 7 seconds

    };

    const truncateName = (fileName: string) => {
      const length = fileName.length; // type-inferred
      const frontPart = fileName.substring(0, 20); // type-inferred
      const backPart = fileName.substring(length - 8, length); // type-inferred
      return frontPart + "..." + backPart;
    }



useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  
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
                <AudioRecorder downloadType = "audio/mpeg"></AudioRecorder>
            </div>

            <div className={styles.serviceFiles}> 
                <h2>Upload</h2>
                <p>1 file only</p>
                <label htmlFor="getAudio">
                    <FileUploadIcon style = {{fontSize:30, color: "#434343"}}/>
                    Audio{/*theFile ? "Reselect"  : "Audio"*/}
                </label>
                <input 
                  id = "getAudio"
                  type ="file" 
                  accept = "audio/*, .mp4" 
                  onChange={handleFileChange} 
                  style= {{display:"none"}}
                />            
                {theFile ? 
                  <p><small>{truncateName(theFile.name)}   
                    <button onClick = {deleteFile}><DeleteIcon style = {{color: "#789DE5"}}/>
                    </button></small></p> 
                  : <p><small>No file chosen</small></p>}

                {(theFile && !isFileUploaded) && 
                <div className={styles.serviceFilesEnd}>
                  <button onClick={uploadFunction}>Confirm</button>
        
                  <label htmlFor="getAudio">Reselect</label>
                  <input 
                      id = "getAudio"
                      type ="file" 
                      accept = "audio/*, .mp4" 
                      onChange={handleFileChange} 
                      style= {{display:"none"}}
                  />
                  
                </div>
                }
                {isFileUploaded && 
                  <p style = {{alignItems: "center"}}>

                    {progress != 100 ? <LoadingSign value = {progress} /> : 
                    <small>
                    <CheckCircleOutlineIcon style = {{alignItems: "center", color: "#00F01C"}}/> 
                      File Sent!
                    </small>}
                  </p>
                }

            </div>
            
        </div>

        <footer>
            <p>to insert footer?</p>
        </footer> 
    </div>
  );
}
