"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

// Attempt 1: useEffect Solution //
// Listen for popState Event in /record/record-audio.tsx
// In the functional component definition, write:
useEffect(() => {
    const handlePopState = (event: any) => {
      console.log("Back button pressed");
      console.log(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`
      );
    };
    // Listen for popstate events
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });
// Issue with the solution: console.log() wasn't even executed, impliying that PopState event was not detected.



// Attempt 2: Microphone Context Solution // 
// Idea: at Home page, code can check if the mediaRecorder state is active and if active, turn it into inactive
// ...so in order to access the mediaRecorder, mediaRecorder needs to store it not just only in the component. useContext was tried out.

interface MicType {
  mediaRecorder: React.MutableRefObject<MediaRecorder | null>;
  stream: MediaStream | null; // may not need
}
const MicContext = createContext<MicType | undefined>(undefined);

export const MicProvider: React.FC<any> = ({ children }) => {
  // not sure what type -- the ? in FC<?> is

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null); // store microphone connection
  const mimeTypeUsed: string = "audio/webm";

  useEffect(() => {
    console.log("useEffect ran");
    async () => {
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
        return;
      } // don't bother executing the rest of the code which aims to start the mic
      const streamToUse: MediaStream = localStream;
      const media = new MediaRecorder(streamToUse, { mimeType: mimeTypeUsed }); //creates a new MediaRecorder object that will record a specified MediaStream
      mediaRecorder.current = media;
    };
  }); // no need dependency array?

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

  return (
    <MicContext.Provider
      value={{
        mediaRecorder,
        stream,
      }}
    >
      {children}
    </MicContext.Provider>
  );
};

export const useMic = () => {
  const localContext = useContext(MicContext);
  if (localContext === undefined) {
    throw new Error("useContext must be inside a Provider");
  }
  return localContext;
};

// and then in the /Home/page.tsx:
const { mediaRecorder } = useMic(); // can only be in client mode
  console.log("supp");
  if (mediaRecorder.current) {
    if (mediaRecorder.current.state === "recording") { // according to MediaRecorder API
      mediaRecorder.current.stop();
    }
  }

// There are various issues with the solution but the main Issue with the solution:...
// ...MicContext provider do not store the updated microphone ref when "invoked" during /record page anyway
// ...so mediaRecorder.current in /Home/page.tsx will be null always.