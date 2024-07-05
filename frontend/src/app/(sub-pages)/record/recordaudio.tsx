"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../styles.module.css";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import { dummyText1 } from "@/app/constants";


interface AudioProps {
  downloadType: string;
}

const AudioRecorder: React.FC<AudioProps> = (props): JSX.Element => {
  //FC is functional component
  // Initialising variables & status code //

  // Time
  const [time, updateTiming] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any | null>(null);
  const startTimeRef = useRef(0);

  // Recording
  const INACTIVE: number = 0; // no recording taking place
  const ACTIVE: number = 1; // recording in progress
  const PAUSE: number = 2; // recording paused
  const mimeTypeUsed: string = "audio/webm";

  const [recordingStatus, setRecordingStatus] = useState<number>(INACTIVE);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<any[]>([]); // array to store parts of the generated recording
  const [audio, setAudio] = useState<string>("");
  const [transcribedText, setTranscribedText] = useState<string>("");

  // Functions //
  // Time
  const startTiming = () => {
    // Date.now(): miliseoncds elapsed since epoch (1 Jan 1970, UTC 0000h)
    startTimeRef.current = Date.now() - 10; // Reference Time when timing started. Assumes 10 ms lag in code runtime
    intervalRef.current = setInterval(() => {
      updateTiming(
        Math.floor((Date.now() - startTimeRef.current) / 1000) + time
      ); // divide by 1000 for ms to second
    }, 1000); // Math.floor(): round down
    setRunning(true);
  };

  const pauseTiming = () => {
    clearInterval(intervalRef.current); // stops the function excution defined in setInterval(): setTime()
    setRunning(false);
  };

  const stopTiming = () => {
    clearInterval(intervalRef.current);
    updateTiming(0);
    setRunning(false);
  };

  const timeInHourMinSec = (timing: number) => {
    const hours = Math.floor(timing / 3600);
    const minutes = Math.floor((timing % 3600) / 60);
    const seconds = (timing % 3600) % 60;
    const timeInMinSec =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return hours > 0
      ? hours.toString().padStart(2, "0") + ":" + timeInMinSec
      : timeInMinSec;
  };

  // Recording
  const startRecording = async () => {
    if (recordingStatus === ACTIVE) {
      // pause shouldn't be part of the possible cases
      alert("Recording in progress");
      return;
    }

    // Ask for Permission
    let localStream: MediaStream | null = stream;
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false
    ) {
      if ("MediaRecorder" in window) {
        // window object. Check if browser supports MediaRecorder. If yes, we access this MediaRecorder API (to eventually access microphone)
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          }); // returns a promise that resolves successfully if the user permits access to the media.
          setStream(mediaStream); // stream state variable = microphone obtained?
          localStream = mediaStream;
          //hasPermissionAsked = true;
        } catch (err: any) {
          // executed if user block the microphone // catch must be of type any or unknown.
          alert(
            err.message +
              "\nTo record, localhost requires access to microphone."
          ); // display text in a dialog box that pops up on the screen
          return;
        }
      } else {
        alert("The MediaRecorder API is not supported in your browser.");
      }
    }

    if (!localStream) {
      return;
    } // don't bother executing the rest of the code which aims to start the mic

    const streamToUse: MediaStream = localStream;
    const media = new MediaRecorder(streamToUse, { mimeType: mimeTypeUsed }); //creates a new MediaRecorder object that will record a specified MediaStream
    mediaRecorder.current = media;

    // start Recording
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false
    ) {
      return;
    }
    mediaRecorder.current.start();
    setRecordingStatus(ACTIVE);
    startTiming();

    let localAudioChunks: any[] = [];

    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data); // to replace code to send to backend; real-time send back or finish recording then send back?
    };
    setAudioChunks(localAudioChunks);
  };

  const pauseRecording = () => {
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false
    ) {
      alert(
        "Fail to pause as microphone access is blocked. Parts of recording may be missing"
      );
      return;
    }
    mediaRecorder.current.pause();
    setRecordingStatus(PAUSE);
    pauseTiming();
  };

  const contRecording = () => {
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false
    ) {
      alert("Please allow microphone access before continuing");
      return;
    }
    mediaRecorder.current.resume(); // how come continue no need audioChunks array...
    setRecordingStatus(ACTIVE);
    startTiming();
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) {
      return;
    }
    if (mediaRecorder.current.stream.active == false) {
      alert(
        "Microphone access was blocked at some point. Parts of recording may be missing."
      );
    }
    setRecordingStatus(INACTIVE);
    mediaRecorder.current.stop();

    stopTiming();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: props.downloadType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      let backStage = dummyText1;
      setTranscribedText(dummyText1);
      setAudioChunks([]);
    };
  };

  useEffect(() => {
    if (running) {
      startTiming();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    // beware of repeating components just beacuse the style change...
    <div className={styles.serviceRecordContent}>
      {recordingStatus === ACTIVE ? ( // recording status
        <div className={styles.serviceRecordPlay}>
          <div
            style={{
              flexDirection: "row",
            }}
          >
            <button
              onClick={stopRecording}
              type="button"
              style={{ margin: "0px 2px" }}
            >
              <StopCircleOutlinedIcon
                style={{ fontSize: "9vh", color: "red" }}
              />
            </button>
            <p style={{ margin: "0px 2px" }}>{timeInHourMinSec(time)}</p>
          </div>
          <button
            onClick={pauseRecording}
            type="button"
            style={{ margin: "0px 2px" }}
          >
            <PauseCircleOutlineIcon style={{ fontSize: "9vh" }} />
          </button>
        </div>
      ) : recordingStatus === PAUSE ? ( // pause status
        <div className={styles.serviceRecordPlay}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button
              onClick={stopRecording}
              type="button"
              style={{ margin: "0px 2px" }}
            >
              <StopCircleOutlinedIcon style={{ fontSize: "9vh" }} />
            </button>
            <p style={{ margin: "0px 2px" }}>{timeInHourMinSec(time)}</p>
          </div>

          <button
            onClick={contRecording}
            type="button"
            style={{ margin: "0px 2px" }}
          >
            <PlayCircleOutlineIcon style={{ fontSize: "9vh" }} />
          </button>
        </div>
      ) : (
        <div className={styles.serviceRecordMic}>
          <button onClick={startRecording}>
            <MicIcon
              style={{
                fontSize: "6.5vh",
                alignItems: "center",
                color: "black",
              }}
            />
          </button>
        </div>
      )}

      {audio && recordingStatus === INACTIVE ? (
        <div className={styles.serviceRecordAudio}>
          <audio src={audio} controls></audio>

          <button>
            <a download href={audio}>
              <DownloadIcon
                style={{
                  fontSize: "6.5vh",
                  alignItems: "center",
                }}
              />
            </a>
          </button>
        </div>
      ) : null}
      <br></br>
      <hr style={{ border: "1px dashed", color: "black", width: "80vw" }}></hr>
      <div className={styles.transcribe}>
          <h4>
            Transcribed Text:
          </h4>
        <p>
          {audio ? transcribedText : "No file has been transcribed"}
        </p>
      </div>
    </div>
  );
};
// WHY HORIZONTAL LINE HERE NEED TO USE VW AND NOT %?? (same as the .transcribe div)
export default AudioRecorder;
