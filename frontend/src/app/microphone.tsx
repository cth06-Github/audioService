// testing to see if conetext works // 
/*
"use client";
import {  createContext, useContext, useState, useRef, useEffect } from "react";

interface MicType {
    mediaRecorder: React.MutableRefObject<MediaRecorder | null>
    stream: MediaStream | null // may not need
}

const MicContext = createContext<MicType | undefined>(undefined);

export const MicProvider: React.FC<any> = ({ children }) => {
    // not sure what type -- the ? in FC<?> is

    // GO CHANGE THE RECORD AUDIO TO USING this CONTEXT LEH
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null); // store microphone connection
    const mimeTypeUsed: string = "audio/webm";
  
    console.log("ya")

    useEffect(() => {
console.log("Effect")
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
        }
    }); // no need dependency array??

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

    /*
    const micCheck = async () => {
        /*
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

    micCheck(); // hmm...*/
/*
    return (
        <MicContext.Provider
      value={{
        mediaRecorder,
        stream
      }}
    >
      {children}
    </MicContext.Provider>
  );
    
}

export const useMic = () => {
    const localContext = useContext(MicContext);
    if (localContext === undefined) {
      throw new Error("useContext must be inside a Provider");
    }
    return localContext;
  };*/