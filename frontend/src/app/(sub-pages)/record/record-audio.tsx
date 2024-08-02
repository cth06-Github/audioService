"use client";
import React from 'react'
import Header from "../../(components)/header";
import { useState, useEffect, useRef } from "react";
import styles from "../styles.module.css";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import { dummyTranscription } from "@/app/mock-data";
import TranscriptBox from "@/app/(components)/transcript-box";
import { logout, toHome } from "@/app/lib-authen";
import { SectionPopUpProps } from "@/app/(components)/(dialog)/dialog-all";
import usePageVisibility from "./visibility-hook";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { useNavDialog } from '../dialog(nav)-logic'
//import { useMic } from '@/app/microphone';

interface AudioProps {
  downloadType: string;
  username: string;
}

const AudioRecorder: React.FC<AudioProps> = (props): JSX.Element => {
  // Time
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimeRef = useRef(0);

  // Recording
  const INACTIVE: number = 0; // no recording taking place
  const ACTIVE: number = 1; // recording in progress
  const PAUSE: number = 2; // recording paused
  const mimeTypeUsed: string = "audio/webm";

  //const { mediaRecorder } = useMic(); 
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null); // store microphone connection
  const [recordingStatus, setRecordingStatus] = useState<number>(INACTIVE);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]); // array to store parts of the generated recording
  const [audio, setAudio] = useState<string>("");
  const [transcribedText, setTranscribedText] = useState<string>("");

  const HOME = "home"; // TO COMMENT IT BACK
  const LOGOUT = "logout";
  const { navDialog, clearNavDialog, agreeNavDialogAction, navCheck } = useNavDialog() // triggerNavDialog not used
  const [micDialog, setMicDialog] = useState<boolean>(false);
  const triggerMicDialog = () => setMicDialog(true); // beautify naming
  const clearMicDialog = () => setMicDialog(false); // beautify naming

  const isVisible = usePageVisibility();
  useEffect(() => {
    console.log("status" + isVisible);
    if (isVisible) {
      console.log("Visible, on the page");
    } else if (isVisible === null) {
      console.log("probs on the page...albeit can be false");
    } else {
      if (recordingStatus !== INACTIVE) {
        alert("Recording will be stopped."); //don't think pop up will work
        stopRecording();
        console.log("hidden 24680 was recording");
      } else {
        console.log("hidden 12345 never record");
      }
    }
  }, [isVisible]);

  useEffect(() => {
    // refresh...not for back button. As in back & forward yes IF PAGE ACCESSED THROUGH pure link, not router.push()
    function beforeUnload(e: BeforeUnloadEvent) {
      if (recordingStatus !== INACTIVE) {
        //setNavPopUp(true);
        e.preventDefault(); // but the notification isn't suitable
        stopRecording();
        console.log("pending is true");
      }
      console.log("well");
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });


  
  const router = useRouter();
  useEffect(() => {
    const handlePopState = (event: any) => {
      // what event type is this?
      console.log("Back button pressed");
      console.log(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
      );
    };
    // Listen for popstate events
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

console.log("the state, the state!")
if (mediaRecorder.current) {
  console.log(mediaRecorder.current.state)
}

  /*
  useEffect(() => {
    // DOES NOT WORK
    function hashChange() {
      console.log("history detected");
    }
    console.log("did we ");
    window.addEventListener("hashchange", hashChange);

    return () => {
      window.removeEventListener("hashchange", hashChange);
    };
  });
*/

  // Time
  const startTiming = () => {
    // Date.now(): miliseoncds elapsed since epoch (1 Jan 1970, UTC 0000h)
    startTimeRef.current = Date.now() - 10; // Reference Time when timing started. Assumes 10 ms lag in code runtime
    intervalRef.current = setInterval(() => {
      if (
        !mediaRecorder.current ||
        mediaRecorder.current.stream.active == false
      ) {
        pauseTiming();
        alert(
          "Recording has stopped or paused as microphone access is blocked. Please check permission settings and restart recording"
        );
      } 
      else {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 1000) + time);
      } // divide by 1000 for ms to second
    }, 1000); // Math.floor(): round down
  };

  const pauseTiming = () => {
    clearInterval(intervalRef.current); // stops the function excution defined in setInterval(): setTime()
  };

  const stopTiming = () => {
    clearInterval(intervalRef.current);
    setTime(0);
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
  const pressMic = async () => {
    const checkpoint1 = await micCheck(); // must await here, otherwise returns promise execution not finish // CATACH ERROR NEEDED halfwat?
    console.log("what checkpint");
    console.log(checkpoint1);

    if (!checkpoint1) {
      return;
    }
    if (!transcribedText) {
      startRecording();
    } else {
      triggerMicDialog();
    }
  };

  const pressStop = () => {
    stopRecording();
    saveAudio();
  };

  
  const micCheck = async () => {
    if (recordingStatus === ACTIVE) {
      // pause shouldn't be part of the possible cases
      alert("Recording in progress");
      return false;
    }

    // Ask for Permission
    let localStream: MediaStream | null = stream;
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false
    ) {
      localStream = await getPermission(localStream);
      console.log("local stream after waiting");
      console.log(localStream);
    }

    if (!localStream) {
      return false;
    } // don't bother executing the rest of the code which aims to start the mic

    const streamToUse: MediaStream = localStream;
    const media = new MediaRecorder(streamToUse, { mimeType: mimeTypeUsed }); //creates a new MediaRecorder object that will record a specified MediaStream
    mediaRecorder.current = media;

    return true;
  };

  async function getPermission(localStream: MediaStream | null) {
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
        // executed if user block the microphone 
        alert(
          err.message +
            "\nTo record, localhost requires access to microphone. Please allow access."
        ); // display text in a dialog box that pops up on the screen
        localStream = null; // to update the current stream "globally"
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
    return localStream;
  }


  const startRecording = () => {
    console.log(mediaRecorder.current);
    if (!mediaRecorder.current) {
      throw "Error";
    }

    mediaRecorder.current.start(1000); //every 1s, .ondataavailale Event is fired
    setRecordingStatus(ACTIVE);
    startTiming();

    let localAudioChunks: any[] = [];

    mediaRecorder.current.ondataavailable = (event: any) => {
      console.log("ondataavailable run");
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data); // to replace code to send to backend; real-time send back or finish recording then send back?
      console.log("TTT ");
      console.log(event.data);
      console.log(localAudioChunks);
      setTranscribedText(stringify(localAudioChunks));
    };
    setAudioChunks(localAudioChunks);
  };

      // Simulation purpose //
      function stringify(audioChunks: any[]) {
        let toReturn: string = "";
        for (let i = 0; i < audioChunks.length; i++) {
          toReturn += `Blob${i} `;
        }
        return toReturn;
      }

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
    mediaRecorder.current.resume(); 
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
    mediaRecorder.current.stop();
    setRecordingStatus(INACTIVE);
    stopTiming();
  };

  const saveAudio = () => {
    if (!mediaRecorder.current) {
      throw "Error null strange";
    }
    mediaRecorder.current.onstop = () => {
      console.log("recording stop");
      console.log(audioChunks);
      const audioBlob = new Blob(audioChunks, { type: props.downloadType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      setTranscribedText(transcribedText + dummyTranscription);
    };
  };

  const deleteTranscript = () => {
    if (recordingStatus !== INACTIVE) {
      alert(
        "Recording in progress. Please stop recording before deleting transcription"
      ); // when the alert is shown, recording STILL continues in the background.
      return;
    }
    setTranscribedText("");
  };
  

  // Dialog functions and handlers
  const pressHome = () => {
    console.log("PHS1101")
    //router.push("/home")
    //history.pushState({}, '', '/home'); // added
    navCheck(recordingStatus !== INACTIVE, HOME, () => router.push("/home"))
  }
  const pressLogout = () => navCheck(recordingStatus !== INACTIVE, LOGOUT, logout)
  const handleAgreeNavDialog = () => agreeNavDialogAction(stopRecording)

  const handleClosePopUp = () => {
    // should separate into different handlers?
    clearMicDialog();
    clearNavDialog();
  };

  const handleAgreeMicPopUp = async () => {
    const checkpoint1 = await micCheck(); 
    if (!checkpoint1) {
      clearMicDialog(); // don't want it to even appear after it was set as true previously.
      return; 
    } else {
      console.log("clicked yes, clear text");
      setTranscribedText("");
      clearMicDialog();
      startRecording();
    }
  };

  return (
    <>
      <Header
        heading="Record"
        description="Real-time Transcription"
        hasHome={true}
        user={props.username}
        onClickFuncHome={pressHome}
        onClickFuncLogout={pressLogout}
      />

      <div className={styles.serviceRecord}>
        <div className={styles.serviceRecordContent}>
          {recordingStatus !== INACTIVE ? ( // recording or pause status
            <div className={styles.serviceRecordPlay}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                <button
                  onClick={pressStop}
                  type="button"
                  style={{ margin: "0px 2px" }}
                >
                  <StopCircleOutlinedIcon
                    style={{
                      fontSize: "9vh",
                      color: `${
                        recordingStatus === ACTIVE ? "red" : "inherit"
                      }`,
                    }} /*inherit: black if in light mode, white if in dark mode*/
                  />
                </button>
                <p style={{ fontSize: "1.3rem" }}>{timeInHourMinSec(time)}</p>
              </div>

              {recordingStatus === ACTIVE ? (
                <button
                  onClick={pauseRecording}
                  type="button"
                  style={{ margin: "0px 1px" }}
                >
                  <PauseCircleOutlineIcon style={{ fontSize: "9vh" }} />
                </button>
              ) : (
                /*pause status*/
                <button
                  onClick={contRecording}
                  type="button"
                  style={{ margin: "0px 1px" }}
                >
                  <PlayCircleOutlineIcon style={{ fontSize: "9vh" }} />
                </button>
              )}
            </div>
          ) : (
            <div className={styles.serviceRecordMic}>
              <button onClick={pressMic}>
                <MicIcon
                  style={{
                    fontSize: "2.5rem",
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
        </div>
        <TranscriptBox
          transcript={transcribedText}
          deleteFunc={deleteTranscript}
        />
        <SectionPopUpProps
          actionItems={["Recording", "recorded audio"]}
          state={[micDialog, navDialog]}
          onClose={handleClosePopUp}
          onAgree={[handleAgreeMicPopUp, handleAgreeNavDialog]}
        />

      </div>
    </>
  );
};
export default AudioRecorder;
