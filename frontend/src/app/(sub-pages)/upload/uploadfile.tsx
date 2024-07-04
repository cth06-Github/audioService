"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../styles.module.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSign from "../../(components)/loading";

export default function UploadFile() {
  const [theFile, chooseFile] = useState<File | null>(null); // good to use null?
  const [isFileUploaded, updateUploadStatus] = useState<boolean>(false);
  const [progress, setProgress] = useState(10);
  const fileInputRef = useRef(null); // type-inferred

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reselect same file issue
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
    updateUploadStatus(true); // update inputValue variable with event.target.value
    // insert backend code (future)//
    setTimeout(() => {
      chooseFile(null);
      updateUploadStatus(false);
    }, 7000); // 7 seconds
  };

  const truncateName = (fileName: string) => {
    const length = fileName.length; // type-inferred
    const frontPart = fileName.substring(0, 20); // type-inferred
    const backPart = fileName.substring(length - 8, length); // type-inferred
    return frontPart + "..." + backPart;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return (
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
      {theFile ? (
        <p>
          <small>
            {truncateName(theFile.name)}
            <button onClick={deleteFile}>
              <DeleteIcon style={{ color: "#789DE5" }} />
            </button>
          </small>
        </p>
      ) : (
        <p>
          <small>No file chosen</small>
        </p>
      )}
</div>

      
        {theFile && !isFileUploaded && (
          <div className={styles.serviceFilesEnd}>
            <button onClick={uploadFunction}>Confirm</button>
            <label htmlFor="getAudio">Reselect</label>
            </div>
        )}
        {isFileUploaded && (
          <div className={styles.serviceFilesEnd}>
          <p style={{ alignItems: "center" }}>
            {progress != 100 ? (
              <LoadingSign value={progress} />
            ) : (
              <small>
                <CheckCircleOutlineIcon
                  style={{ alignItems: "center", color: "#00F01C" }}
                />
                File Sent!
              </small>
            )}
          </p>
          </div>
        )}
      </div>
    
  );
}
