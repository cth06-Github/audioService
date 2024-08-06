"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/(components)/header";
import TranscriptBox from "@/app/(components)/transcript-box";
import { SectionDialog } from "@/app/(components)/(dialog)/dialog-all";
import { useNavDialog } from "../dialog(nav)-logic";
import { logout } from "@/app/lib-authen";
import { dummyTranscription } from "@/app/mock-data";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { DeleteButton } from "@/app/(components)/buttons-common";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "../styles.module.css";

interface UploadProps {
  username: string;
  isMobileUAparse: boolean;
}

const UploadFile: React.FC<UploadProps> = (props): JSX.Element => {
  // Initialisation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSending, setSentStatus] = useState<boolean>(false);
  const [isTranscribeDone, setTranscribeDone] = useState<boolean>(false);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [transcribedFile, setTranscribedFile] = useState<string>("");
  const [showComplete, setComplete] = useState<boolean>(false); // toggle showing completed logo

  const HOME = "home";
  const LOGOUT = "logout";
  const { navDialog, clearNavDialog, agreeNavDialogAction, navCheck } =
    useNavDialog(); // triggerNavDialog not used
  const [uploadDialog, setUploadDialog] = useState<boolean>(false);
  const triggerUploadDialog = () => setUploadDialog(true); // beautify naming
  const clearUploadDialog = () => setUploadDialog(false); // beautify naming
  const isUploadDialogClicked = useRef<boolean>(false);
  const fileInput = useRef<any>(null);

  // Event handlers: Relating to files & transcript
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComplete(false);
    if (!event.target.files) {
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  const handleDeleteFile = () => {
    const input = document.getElementById("getAudio") as HTMLInputElement; // type assertion. "getAudio": input tag id value
    input.value = ""; // input.files will become FileList {length: 0}
    setSelectedFile(null);
  };

  const handleDeleteTranscript = () => {
    setTranscribedText("");
    setTranscribedFile("");
  };

  const handlePressUpload = () => {
    console.log("pressUpload");
    if (transcribedText) {
      triggerUploadDialog();
    }
  };

  const handleSendFile = async () => {
    setTranscribeDone(false); // reset transcribe done status before sending file

    // Send file to backend
    console.log("Send file to backend for transcription"); // insert backend code in the future
    setSentStatus(true); // when file has been completely sent to backend

    // Clear input.files array
    const input = document.getElementById("getAudio") as HTMLInputElement; // type assertion. "getAudio": input tag id value
    input.value = ""; // input.files will become FileList {length: 0}

    console.log("Backend Transcription in progress");
    setTimeout(() => {
      // code to execute after some time, simulate waiting for backend processes to complete
      let valueFromBackend = dummyTranscription; // receive the value return by the backend service
      setTranscribedText(valueFromBackend);
      setTranscribeDone(true);

      if (!selectedFile) {
        // this error shouldn't happen
        throw new Error(
          "Error: selected file is null. File was not selected successfully prior."
        );
      }
      setTranscribedFile(selectedFile.name);
      setSelectedFile(null); // clear selected file as file has been transcribed successfully
      setSentStatus(false); // reset sentStatus as file has been transcribed successfully
      setComplete(true);
      setTimeout(() => {
        // show the completed logo sign for a few seconds only
        setComplete(false);
      }, 4000); // 4 seconds
    }, 5000); // 5 seconds
  };

  // Event handlers: Relating to Navigation & Dialogs
  const router = useRouter();
  const handlePressHome = () => {
    console.log("Pressed Home!");
    navCheck(!transcribedText && isFileSending, HOME, () =>
      router.push("/home")
    );
  };
  //navCheck(condition: boolean, navDestination: string, navFunc: () => void)
  const handlePressLogout = () => {
    console.log("Pressed Logout!");
    navCheck(!transcribedText && isFileSending, LOGOUT, logout);
  };

  const handleAgreeNavDialog = () => agreeNavDialogAction();

  const handleAgreeUploadDialog = () => {
    isUploadDialogClicked.current = true;
    handleDeleteTranscript();
    if (!fileInput.current) {
      throw new Error("Input tag not detected");
    }
    fileInput.current.click();
    clearUploadDialog();
    isUploadDialogClicked.current = false;
  };

  const handleCloseDialog = () => {
    clearUploadDialog();
    clearNavDialog();
  };

  // Helper Function
  const truncateName = (fileName: string, charLength: number) => {
    const length: number = fileName.length;
    if (fileName.length < charLength) {
      return fileName;
    }
    const frontPart = fileName.substring(0, charLength - 8);
    const backPart = fileName.substring(length - 8, length); // 8 characters
    return frontPart + "..." + backPart;
  };

  const [mobileMatch, setMobileMatch] = useState<boolean>(false);
  useEffect(() => {
    // unable to detect browser on mobile but desktop view && in landscape
    if (!props.isMobileUAparse) {
      const maxTouchPoints = navigator.maxTouchPoints;
      const isOrienPortrait = window.matchMedia("(orientation: portrait)");
      if (maxTouchPoints > 0) {
        console.log(
          "maxTouchPoints: " + maxTouchPoints + " likely touchscreen"
        );
        if (isOrienPortrait.matches) {
          setMobileMatch(true);
          console.log("likely mobile");
        }
      }
    }
  });

  // console.log()
  console.log(
    "Browser detected as mobile via UAparser: " + props.isMobileUAparse
  );
  console.log("Browser detected as mobile via useEffect: " + mobileMatch);

  return (
    <>
      <Header
        heading="Upload"
        description="Transcribe audio files"
        hasHome={true}
        user={props.username}
        onClickFuncHome={handlePressHome}
        onClickFuncLogout={handlePressLogout}
      />
      <div>
        <div className={styles.serviceFiles}>
          <hgroup>
            <h2>Select file</h2>

            {props.isMobileUAparse ||
            mobileMatch /*indicates if browser is on mobile*/ ? (
              <>
                <p>or create new audio file</p>
                <p>
                  <small>(if permission is enabled)</small>
                </p>
              </>
            ) : (
              <p>Choose 1 file only</p>
            )}
          </hgroup>
          <div className={styles.serviceFilesContent}>
            <div className={styles.serviceFilesUpload}>
              <button
                className={styles.uploadButton}
                type="button"
                onClick={handlePressUpload}
              >
                <label htmlFor="getAudio">
                  <FileUploadIcon style={{ fontSize: 30 }} />
                  Audio
                </label>
                <input
                  ref={fileInput}
                  id="getAudio"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  onClick={(event) => {
                    if (
                      !(
                        !transcribedText ||
                        (transcribedText && isUploadDialogClicked.current)
                      )
                    )
                      event.preventDefault();
                  }}
                  style={{ display: "none" }}
                />
              </button>
              <div className="fileDescribe">
                <style jsx>{`
                  .fileDescribe {
                    flex-direction: row;
                    align-items: ${selectedFile && !isFileSending
                      ? "center"
                      : "flex-start"};
                    padding: 3px;
                    height: ${!showComplete ? "2rem" : "0px"};
                  }
                `}</style>

                {selectedFile ? (
                  <>
                    <p>
                      <small>{truncateName(selectedFile.name, 20)}</small>
                    </p>

                    {!isFileSending && (
                      <span>
                        <DeleteButton onClick={handleDeleteFile} />
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
                <button
                  className={styles.serviceFilesEndConfirm}
                  type="button"
                  onClick={handleSendFile}
                >
                  Confirm
                </button>
                <button
                  className={styles.serviceFilesEndReselect}
                  type="button"
                >
                  <label htmlFor="getAudio">Reselect</label>
                </button>
              </div>
            )}
            {(isFileSending || isTranscribeDone) && (
              <div className={styles.serviceFilesEnd}>
                {!isTranscribeDone ? (
                  <p
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <span>
                      <CircularProgress />
                    </span>
                    Transcribing...
                  </p>
                ) : (
                  showComplete && (
                    <p>
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
        deleteFunc={handleDeleteTranscript}
      />
      <SectionDialog
        actionItems={["Transcribing", "uploaded files"]}
        state={[uploadDialog, navDialog]}
        onClose={handleCloseDialog}
        onAgree={[handleAgreeUploadDialog, handleAgreeNavDialog]}
      />
    </>
  );
};

export default UploadFile;
