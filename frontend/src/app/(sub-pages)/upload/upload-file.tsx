"use client";

import { useState, useRef } from "react";
import styles from "../styles.module.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { dummyTranscription } from "@/app/mock-data";
import TranscriptBox from "@/app/(components)/transcript-box";
import { Delete } from "@/app/(components)/button-common";
import { SectionPopUpProps } from "@/app/(components)/(dialog)/dialog-all";
import { logout, toHome } from "@/app/lib-authen";
import Header from "@/app/(components)/header";
import { useNavDialog } from '../dialog(nav)-logic'

interface UploadProps {
  username: string;
}

const UploadFile: React.FC<UploadProps> = (props): JSX.Element => {
  const [selectedFile, chooseFile] = useState<File | null>(null); // good to use null?
  const [isFileSending, setSentStatus] = useState<boolean>(false); 
  const [isTranscribeDone, setTranscribeDone] = useState<boolean>(false); 
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [transcribedFile, setTranscribedFile] = useState<string>("");
  const [showComplete, setComplete] = useState<boolean>(false);

  
  const HOME = "home";
  const LOGOUT = "logout";
  const { navDialog, clearNavDialog, agreeNavDialogAction, navCheck } = useNavDialog() // triggerNavDialog not used
  const [uploadDialog, setUploadDialog] = useState<boolean>(false);
  const triggerUploadDialog = () => setUploadDialog(true); // beautify naming
  const clearUploadDialog = () => setUploadDialog(false); // beautify naming

  const hasTranscribedTextfrmPopUp = useRef<boolean>(false); // only used for pop-up indication
  const fileInput = useRef<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComplete(false); // completion logo
    console.log(event.target.files);
    if (!event.target.files) {
      return;
    }
    chooseFile(event.target.files[0]);
  };

  const deleteFile = () => {
    const input = document.getElementById("getAudio") as HTMLInputElement; // type assertion. if there is error, probably the id value of the input tag is written wrongly
    input.value = ""; // input.files will become FileList {length: 0}
    chooseFile(null);
    console.log(input.files);
  };

  const deleteTranscript = () => {
    setTranscribedText("");
    setTranscribedFile("");
  };

  const uploadFunction = async () => {
    setTranscribeDone(false); // always clear the transcribe done status prior to sending to backend [Will imm. update?]
    setTranscribedFile("");

    // insert backend code (future). For now://
    console.log("Send file to backend for transcription");
    setSentStatus(true); // when done sending to backend
    const input = document.getElementById("getAudio") as HTMLInputElement; // type assertion.
    input.value = "";

    console.log("Backend Transcription in progress");
    setTimeout(() => {
      let backStage = dummyTranscription; // backstage will receive the value return by the backend service?
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
      }, 4000); // 4 seconds
    }, 5000); // 5 seconds
  };

  const truncateName = (fileName: string, charLength: number) => {
    const length: number = fileName.length;
    if (fileName.length < charLength) {
      return fileName;
    }
    const frontPart = fileName.substring(0, charLength - 8); // 30 characters
    const backPart = fileName.substring(length - 8, length); // 8 characters
    return frontPart + "..." + backPart;
  };

  const pressUpload = () => {
    console.log("pressUpload");
    if (transcribedText) {
      triggerUploadDialog();
    }
  };

  const handleCloseDialog = () => { // should separate into different handlers?
    clearUploadDialog();
    clearNavDialog();
  };

  const handleAgreeUploadDialog = () => {
    hasTranscribedTextfrmPopUp.current = true;
    deleteTranscript();
    if (!fileInput.current) {
      throw new Error("Input tag not detected");
    }
    fileInput.current.click();
    clearUploadDialog();
    hasTranscribedTextfrmPopUp.current = false;
  };

  const handleAgreeNavDialog =  () => agreeNavDialogAction()
  const pressHome = () => navCheck(!transcribedText && isFileSending, HOME, toHome)
  const pressLogout = () => navCheck(!transcribedText && isFileSending, LOGOUT, logout)

  return (
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
            <p style={{ textAlign: "center" }}>Choose 1 file only</p>
          </hgroup>
          <div className={styles.serviceFilesContent}>
            <div className={styles.serviceFilesUpload}>
              <button className={styles.uploadButton} onClick={pressUpload}>
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
                  onClick={
                    (event) => {
                      if (
                        !(
                          !transcribedText ||
                          (transcribedText &&
                            hasTranscribedTextfrmPopUp.current)
                        )
                      )
                        event.preventDefault();
                    } 
                  }
                  style={{ display: "none" }}
                />
              </button>
              <div className="fileDescribe">
                <style jsx>{`
                  .fileDescribe {
                    padding: 3px;
                    height: ${!showComplete ? "2rem" : "0px"};
                    flex-direction: row;
                    align-items: ${selectedFile && !isFileSending
                      ? "center"
                      : "flex-start"};
                  }
                `}</style>

                {selectedFile ? (
                  <>
                    <p style={{ textAlign: "center" }}>
                      <small
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {truncateName(selectedFile.name, 20)}
                      </small>
                    </p>

                    {!isFileSending && (
                      <span>
                        <Delete onClick={deleteFile} />
                      </span>
                    )}
                  </>
                ) : (
                  !showComplete && (
                    <p>
                      <small>No file chosen</small>
                    </p>
                  )
                )}
              </div>
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
                ) : (
                  showComplete && (
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleOutlineIcon style={{ color: "#00F01C" }} />
                      Complete!
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <br></br>
      <TranscriptBox
        transcript={transcribedText}
        withInfo={truncateName(transcribedFile, 25)}
        deleteFunc={deleteTranscript}
      />
      <SectionPopUpProps
        actionItems={["Transcribing", "uploaded files"]}
        state={[uploadDialog, navDialog]}
        onClose={handleCloseDialog}
        onAgree={[handleAgreeUploadDialog, handleAgreeNavDialog]}
      />
    </>
  );
};

export default UploadFile;
