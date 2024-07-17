"use client";

import { useState, useRef } from "react";
import styles from "../styles.module.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { dummyText1 } from "@/app/constants";
import TranscriptBox from "@/app/(components)/transcript-box";
import { Delete } from "@/app/(components)/button-common";
import { SectionPopUpProps } from "@/app/(components)/(dialogs)/pop-up-section";
import { logout, toHome } from "@/app/lib-authen";
import Header from "@/app/(components)/header";


interface UploadProps {
  username: string;
}

const UploadFile: React.FC<UploadProps> = (props): JSX.Element => {
  const [selectedFile, chooseFile] = useState<File | null>(null); // good to use null?
  const [isFileSending, setSentStatus] = useState<boolean>(false); // sending rather than sent.
  const [isTranscribeDone, setTranscribeDone] = useState<boolean>(false); // change to true to try out something
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [transcribedFile, setTranscribedFile] = useState<string>("");
  const [showComplete, setComplete] = useState<boolean>(false);

  const [uploadPopUp, setUploadPopUp] = useState<boolean>(false);
  const [NavPopUp, setNavPopUp] = useState<boolean>(false);
  const headerButtonPressed = useRef<string | undefined>(); 

  const hasTranscribedTextfrmPopUp= useRef<boolean>(false); // only used for pop-up indication, confusing
  const fileInput = useRef<any>(null);

  const HOME = "home"
  const LOGOUT = "logout"

  const handleClosePopUp = () => { // should separate into different handlers?
    setUploadPopUp(false);
    setNavPopUp(false);
  };

  const handleAgreeUploadPopUp = () => {
    hasTranscribedTextfrmPopUp.current = true;
    deleteTranscript();
    console.log("clicked yes, clear text");
    console.log(fileInput);
    console.log("yeehah")
    console.log(hasTranscribedTextfrmPopUp.current);
    if(!fileInput.current) {throw "Error input tag null??"} 
    console.log("going to click");
    console.log(uploadPopUp)
    fileInput.current.click();
    setUploadPopUp(false); 
    hasTranscribedTextfrmPopUp.current = false;
  };

  // hmm can we combine such thta it's in the logout and home button that contains this info on which server action to choose (CS2030 style)
  const handleAgreeNavPopUp = () => { // really repeating sial with the record component
    console.log("clicked yes, navigate");
    setUploadPopUp(false);
    if (headerButtonPressed.current === HOME) { toHome() }
    else if (headerButtonPressed.current === LOGOUT) { logout() }
  }

  const pressHome = () => {
    if (!transcribedText && isFileSending) {
      headerButtonPressed.current = HOME;
      console.log(headerButtonPressed)
      setNavPopUp(true);
    }
    else toHome(); // you can have server actions in event handlers.
  }

  // are both considered repeats?
  
  const pressLogout = () => { 
    if (!transcribedText && isFileSending) {
      headerButtonPressed.current = LOGOUT;
      setNavPopUp(true);
    }
    else logout(); // you can have server actions in event handlers.
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reselect same file issue
    setComplete(false); // completion logo
    console.log(event.target.files)
    if (!event.target.files) {
      return;
    }
    chooseFile(event.target.files[0]);
    
  };

  console.log("hmm")
  console.log(selectedFile)

  const deleteFile = () => {
    const input = document.getElementById('getAudio') as HTMLInputElement // type assertion. if there is error, probably the id value of the input tag is written wrongly
    input.value = ""; // input.files will become FileList {length: 0}
    chooseFile(null);
    console.log(input.files)
  };

  const deleteTranscript = () => {
    setTranscribedText(""); 
    setTranscribedFile("");
   
  }

  const uploadFunction = async () => {
    setTranscribeDone(false); // always clear the transcribe done status prior to sending to backend [Will imm. update?]
    setTranscribedFile("");

    // insert backend code (future). For now://
    console.log("Send file to backend for transcription"); 
    setSentStatus(true); // when done sending to backend 
    const input = document.getElementById('getAudio') as HTMLInputElement // type assertion. if there is error, probably the id value of the input tag is written wrongly
    input.value = "";  
    
    console.log("Backend Transcription in progress"); 
    setTimeout(() => {
      let backStage = dummyText1; // backstage will receive the value return by the backend service?
      setTranscribedText(backStage);
      setTranscribeDone(true);
      if (!selectedFile) {
        throw "Error: selected file is null";
      }
      setTranscribedFile(selectedFile.name);
      chooseFile(null);
      setSentStatus(false);
      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 4000);
    }, 5000); // 5 seconds
  };

  const truncateName = (fileName: string) => {
    // truncate only if >41 characters
    const length: number = fileName.length;
    if (fileName.length < 42) {
      return fileName;
    }
    const frontPart = fileName.substring(0, 30); // 30 characters
    const backPart = fileName.substring(length - 8, length); // 8 characters
    return frontPart + "..." + backPart;
  };

  const pressUpload = () => {
    console.log("pressUpload")
    if (transcribedText) { 
      setUploadPopUp(true);
    } 
  };

  return ( // hard code the height of division (not ideal)
    <>
    
    <Header
        heading="Upload"
        description="Transcribe existing audio"
        hasHome={true}
        user={props.username}
        onClickFuncHome={pressHome}
        onClickFuncLogout={pressLogout}
      />
      <div>
        <div className={styles.serviceFiles}>
          <hgroup>
            <h2>Select files</h2>
            <p style ={{textAlign: "center"}}>Choose 1 file only</p>
          </hgroup>
          <div className={styles.serviceFilesContent}>
            <div className={styles.serviceFilesUpload}>
             
             <button className={styles.uploadButton} onClick = {pressUpload} >
              <label htmlFor="getAudio">
                <FileUploadIcon style={{ fontSize: 30 }} />
                Audio
              </label>

                
              <input
                ref={fileInput} 
                id="getAudio"
                type="file"
                accept="audio/*, .mp4"
                onChange={handleFileChange}
                onClick={(event) => {console.log("wwww" + uploadPopUp); if (!(!transcribedText || transcribedText && hasTranscribedTextfrmPopUp.current)) event.preventDefault()} /*gonna confusing*/}
                style={{ display: "none" }}
              />
              </button>
              {selectedFile ? (
                <div style={{ height: "5vh" }}>
                  <p>
                    <small style={{ display: "flex", alignItems: "center" }}>
                      {truncateName(selectedFile.name)}
                      {!isFileSending && (
                        <span><Delete onClick={deleteFile}/></span>
                      )}
                    </small>
                  </p>
                </div>
              ) : (
                !showComplete && (
                  <div style={{ height: "5vh" }}>
                    <p>
                      <small>No file chosen</small>
                    </p>
                  </div>
                )
              )}
            </div>

            {selectedFile && !isFileSending && (
              <div className={styles.serviceFilesEnd}>
                <button onClick={uploadFunction}>Confirm</button>
                <label htmlFor="getAudio">Reselect</label>
              </div>
            )}
            {(isFileSending || isTranscribeDone) && (
              <div className={styles.serviceFilesEnd}>
                {!isTranscribeDone ? (
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <CircularProgress />
                    </span>
                    Transcribing...
                  </p>
                ) : ((showComplete) &&
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleOutlineIcon style={{ color: "#00F01C" }} />
                    Complete!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <br></br>
      <TranscriptBox transcript = {transcribedText} withInfo = {transcribedFile} deleteFunc={deleteTranscript}/>
      <SectionPopUpProps
      actionItems={["Transcribing", "uploaded files"]}
      state = {[uploadPopUp, NavPopUp]}
      onClose={handleClosePopUp}
      onAgree={[handleAgreeUploadPopUp, handleAgreeNavPopUp]}
      />
    </>
  );
}

export default UploadFile;
