"use client";

import { useState, useRef } from "react";
import styles from "../styles.module.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { dummyText1 } from "@/app/constants";
import TranscriptBox from "@/app/(components)/transcript-box";
import { Delete } from "@/app/(components)/button-common";


export default function UploadFile() {
  const [selectedFile, chooseFile] = useState<File | null>(null); // good to use null?
  const [isFileSent, setSentStatus] = useState<boolean>(false);
  const [isTranscribeDone, setTranscribeDone] = useState<boolean>(false); // change to true to try out something
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [transcribedFile, setTranscribedFile] = useState<string>("");
  const [showComplete, setComplete] = useState<boolean>(false);
  const fileInputRef = useRef(null); // type-inferred

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reselect same file issue
    setComplete(false);
    if (!event.target.files) {
      return;
    }
    chooseFile(event.target.files[0]);
  };

  const deleteFile = () => {
    // need to think of a way to clear the input event listner...
    chooseFile(null);
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current = null;
  };

  const uploadFunction = async () => {
    setSentStatus(true); // update inputValue variable with event.target.value
    setTranscribeDone(false); // always clear the transcribe done status prior to sending to backend [Will imm. update?]
    setTranscribedFile("");
    // insert backend code (future). For now://
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

  return ( // hard code the height of division (not ideal)
    <>
      <div>
        <div className={styles.serviceFiles}>
          <hgroup>
            <h2>Select files</h2>
            <p>Choose 1 file only</p>
          </hgroup>
          <div className={styles.serviceFilesContent}>
            <div className={styles.serviceFilesUpload}>
              <label htmlFor="getAudio">
                <FileUploadIcon style={{ fontSize: 30 }} />
                Audio
              </label>
              <input
                id="getAudio"
                type="file"
                accept="audio/*, .mp4"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              {selectedFile ? (
                <div style={{ height: "5vh" }}>
                  <p>
                    <small style={{ display: "flex", alignItems: "center" }}>
                      {truncateName(selectedFile.name)}
                      {!isFileSent && (
                        <Delete onClick={deleteFile}/>
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

            {selectedFile && !isFileSent && (
              <div className={styles.serviceFilesEnd}>
                <button onClick={uploadFunction}>Confirm</button>
                <label htmlFor="getAudio">Reselect</label>
              </div>
            )}
            {(isFileSent || isTranscribeDone) && (
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
      <TranscriptBox transcript = {transcribedText} withInfo = {transcribedFile} deleteFunc={() => {setTranscribedText(""); setTranscribedFile("")}}/>
    </>
  );
}
