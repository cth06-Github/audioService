import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './upload.module.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingSign from '../components/loading';


export default function UploadFile() {
    const [theFile, chooseFile] = useState<File | null>(null); // good to use null?
    const [isFileUploaded, updateUploadStatus] = useState<boolean>(false);
    const [progress, setProgress] = useState(10);
    const fileInputRef = useRef(null); // type-inferred

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { // to check the type later
        // Update the state with the selected file;; Reselect same file hmm
        if (!event.target.files) {return;} // AMAZING....
        chooseFile(event.target.files[0]); // TO CHECK WHAT IS EVENT.TARGET.FILES[0]...APA ARRAY?
        console.log("file file uploaded:");
        console.log(theFile);
        //event.target.files[0] = null; // this does not work friend...
        console.log("event.target.files null null uploaded:");
        console.log(event.target.files);
    };
  
    const deleteFile = () => {
      chooseFile(null);
      if (!fileInputRef.current) {return;}
      fileInputRef.current = null;
      // need to think of a way to clear the input event listner...
    }
  
    const uploadFunction = async () => {
          console.log("exec, the file uploaded is: ");
          console.log(theFile);
          updateUploadStatus(true); // update inputValue variable with event.target.value
          // event.preventDefault(); <-- does not work in NextJS 
  
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

    return (
        <>
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
                ref={fileInputRef}
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
            </>
    );
}
  