"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/(components)/header";
import TranscriptBox from "@/app/(components)/transcript-box";
import { SectionDialog } from "@/app/(components)/(dialog)/dialog-all";
import { useNavDialog } from "../dialog(nav)-logic";
import usePageVisibility from "./visibility-hook";
import { logout } from "@/app/lib-authen";
import { dummyTranscription } from "@/app/mock-data";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "../styles.module.css";

interface AudioProps {
  downloadType: string;
  username: string;
}

const AudioRecorder: React.FC<AudioProps> = (props): JSX.Element => {
  // Timing Variables Initialisation
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimeRef = useRef(0);

  // Recording Variables Initialisation
  const INACTIVE: number = 0; // no recording taking place
  const ACTIVE: number = 1; // recording in progress
  const PAUSE: number = 2; // recording paused
  const mimeTypeUsed: string = "audio/webm";

  const mediaRecorder = useRef<MediaRecorder | null>(null); // store microphone connection
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<number>(INACTIVE);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]); // array to store parts of the generated recording
  const [audio, setAudio] = useState<string>("");
  const [transcribedText, setTranscribedText] = useState<string>("");

  // Navigation Variables Initialisation
  const HOME = "home";
  const LOGOUT = "logout";
  const { navDialog, clearNavDialog, agreeNavDialogAction, navCheck } =
    useNavDialog(); // triggerNavDialog not used
  const [micDialog, setMicDialog] = useState<boolean>(false);
  const triggerMicDialog = () => setMicDialog(true); // beautify naming
  const clearMicDialog = () => setMicDialog(false); // beautify naming

  const isVisible: boolean | null = usePageVisibility(); // checks if user is directly on the webpage

  // Stop recording if user is not on the record page
  useEffect(() => {
    console.log("isVisible status: " + isVisible);
    if (isVisible === false && recordingStatus !== INACTIVE) {
      handlePressStop();
      alert("Recording has stopped and was saved when you leave the page.");
    }
  }, [isVisible]);

  // Stop recording if user refreshes page or press back/forward button (only in specific circumstances)
  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      console.log("BeforeUnloadEvent BUE fired."); // BUE is fired when browser back/forward button is pressed, ONLY IF page was accessed via URL(not app buttons). BUE fired on refresh too.
      if (recordingStatus !== INACTIVE) {
        e.preventDefault(); // browser built-in dialog may not be suitable
        stopRecording();
      }
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  // Timing Helper functions
  const startTiming = () => {
    // Date.now(): miliseconds elapsed since epoch (1 Jan 1970, UTC 0000h)
    startTimeRef.current = Date.now() - 10; // Reference Time when timing started. Assumes 10 ms lag in code runtime
    intervalRef.current = setInterval(() => {
      if (
        !mediaRecorder.current ||
        mediaRecorder.current.stream.active == false // microphone access denied
      ) {
        pauseTiming();
        alert(
          "Recording has stopped or paused as microphone access is blocked. Please check microphone permission settings and restart recording"
        );
      } else {
        setTime(Math.floor((Date.now() - startTimeRef.current) / 1000) + time); // divide by 1000 to convert ms to second
      }
    }, 1000);
  };

  const pauseTiming = () => {
    clearInterval(intervalRef.current); // stops the function excution defined in setInterval()
  };

  const stopTiming = () => {
    clearInterval(intervalRef.current); // stops the function excution defined in setInterval()
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
    return hours > 0 // returns hh:mm:ss if duration is >=1h, otherwise mm:ss format
      ? hours.toString().padStart(2, "0") + ":" + timeInMinSec
      : timeInMinSec;
  };

  // Recording functions & variables
  const fontSizeButton = "9vh"; // defined for start, stop, play recording buttons

  const handlePressMic = async () => {
    const isMicConnected = await micCheck(); // ensure micCheck execution completion before code continues
    if (!isMicConnected) {
      return;
    }
    if (!transcribedText) {
      startRecording();
    } else {
      triggerMicDialog();
    }
  };

  const handlePressStop = () => {
    stopRecording();
    saveAudio();
  };

  const micCheck = async () => {
    if (recordingStatus === ACTIVE) {
      // pause shouldn't be part of the possible cases
      alert("Recording in progress");
      return false;
    }

    // Check if mic is set up (with permission access enabled)
    let localStream: MediaStream | null = stream;
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false // microphone access denied
    ) {
      localStream = await getMicAccess(localStream); //seek microphone access permission via API
    }

    if (!localStream) {
      return false;
    }

    const streamToUse: MediaStream = localStream;
    const media = new MediaRecorder(streamToUse, { mimeType: mimeTypeUsed }); //creates a new MediaRecorder object that will record a specified MediaStream
    mediaRecorder.current = media;
    return true;
  };

  async function getMicAccess(localStream: MediaStream | null) {
    if ("MediaRecorder" in window) {
      // check if browser supports MediaRecorder. If yes, we access MediaRecorder API (to eventually access microphone)
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          // getUserMedia works only in secure mode (e.g HTTPS) on mobile
          audio: true,
          video: false,
        }); // returns a promise that resolves successfully if the user permits access to the media.
        setStream(mediaStream);
        localStream = mediaStream;
      } catch (err: any) {
        // executed if user block microphone
        alert(
          // open dialog with message
          err.message +
            "\nTo record, localhost requires access to microphone. Please allow access."
        );
        localStream = null; // indicates microphone access denied
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      localStream = null; // indicates microphone access denied
    }
    return localStream;
  }

  const startRecording = () => {
    console.log(mediaRecorder.current);
    if (!mediaRecorder.current) {
      throw new Error("mediaRecorder.current is null. Mic not found");
    }

    mediaRecorder.current.start(1000); // start recording, .ondataavailale Event is fired every 1s
    setRecordingStatus(ACTIVE);
    startTiming();

    let localAudioChunks: any[] = [];

    mediaRecorder.current.ondataavailable = (event: any) => {
      console.log("ondataavailable event fired");
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data); // simulate code for sending audio to backend in real-time (streaming)
      console.log("event data blob sent");
      console.log(event.data);

      // simulate value retured by backend service and then the entire thing set to a transcript
      setTranscribedText(stringify(localAudioChunks));
    };
    setAudioChunks(localAudioChunks);
  };

  // Simulation of transcription process //
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
      mediaRecorder.current.stream.active == false // microphone access denied
    ) {
      alert(
        "Fail to pause as microphone access is blocked. Parts of recording may be missing"
      );
      return;
    }
    mediaRecorder.current.pause(); // pause recording
    setRecordingStatus(PAUSE);
    pauseTiming();
  };

  const contRecording = () => {
    if (
      !mediaRecorder.current ||
      mediaRecorder.current.stream.active == false // microphone access denied
    ) {
      alert("Please allow microphone access before continuing");
      return;
    }
    mediaRecorder.current.resume(); // continue recording
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
    mediaRecorder.current.stop(); // stop recording
    setRecordingStatus(INACTIVE);
    stopTiming();
  };

  const saveAudio = () => {
    if (!mediaRecorder.current) {
      throw new Error("mediaRecorder.current is null. Audio cannot be saved");
    }
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: props.downloadType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      setTranscribedText(transcribedText + dummyTranscription); // simulate dummyTranscription as a value also returned by backend service
    };
  };

  // Text-related function
  const handleDeleteTranscript = () => {
    if (recordingStatus !== INACTIVE) {
      alert(
        "Recording in progress. Please stop recording before deleting transcription"
      ); // when the alert is shown (and before it gets closed), recording STILL continues in the background.
      return;
    }
    setTranscribedText("");
  };

  // Dialog functions
  const router = useRouter();
  const handlePressHome = () => {
    console.log("Pressed Home!");
    navCheck(recordingStatus !== INACTIVE, HOME, () => router.push("/home"));
  };
  const pressLogout = () => {
    console.log("Pressed Logout!");
    navCheck(recordingStatus !== INACTIVE, LOGOUT, logout);
  };

  const handleAgreeNavDialog = () => agreeNavDialogAction(stopRecording); // input parameter is the functions to execute before dialog is cleared

  const handleAgreeMicDialog = async () => {
    const isMicConnected = await micCheck();
    if (!isMicConnected) {
      clearMicDialog();
      return;
    } else {
      setTranscribedText("");
      clearMicDialog();
      startRecording();
    }
  };

  const handleCloseDialog = () => {
    clearMicDialog();
    clearNavDialog();
  };

  // console.log
  if (mediaRecorder.current) {
    console.log(
      "mediaRecorder recording state: " + mediaRecorder.current.state
    );
  }

  return (
    <>
      <Header
        heading="Record"
        description="Real-time Transcription"
        hasHome={true}
        user={props.username}
        onClickFuncHome={handlePressHome}
        onClickFuncLogout={pressLogout}
      />

      <div className={styles.serviceRecord}>
        <div className={styles.serviceRecordContent}>
          {recordingStatus === INACTIVE ? (
            <div className={styles.serviceRecordMic}>
              <button onClick={handlePressMic}>
                <MicIcon
                  style={{
                    fontSize: "2.5rem",
                    alignItems: "center",
                    color: "black",
                  }}
                />
              </button>
            </div>
          ) : (
            <div className={styles.serviceRecordPlay}>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                <button onClick={handlePressStop} type="button">
                  <StopCircleOutlinedIcon
                    style={{
                      fontSize: fontSizeButton, // var defined above
                      color: `${
                        recordingStatus === ACTIVE ? "red" : "inherit"
                      }`,
                    }} /*inherit: black if in light mode, white if in dark mode*/
                  />
                </button>
                <p style={{ fontSize: "1.3rem" }}>{timeInHourMinSec(time)}</p>
              </div>

              {recordingStatus === ACTIVE ? (
                <button onClick={pauseRecording} type="button">
                  <PauseCircleOutlineIcon
                    style={{ fontSize: fontSizeButton }}
                  />
                </button>
              ) : (
                /*pause status*/
                <button onClick={contRecording} type="button">
                  <PlayCircleOutlineIcon style={{ fontSize: fontSizeButton }} />
                </button>
              )}
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
          deleteFunc={handleDeleteTranscript}
        />
        <SectionDialog
          actionItems={["Recording", "recorded audio"]}
          state={[micDialog, navDialog]}
          onClose={handleCloseDialog}
          onAgree={[handleAgreeMicDialog, handleAgreeNavDialog]}
        />
      </div>
    </>
  );
};
export default AudioRecorder;
