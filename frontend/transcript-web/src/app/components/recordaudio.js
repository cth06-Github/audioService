import { useState, useRef } from "react";
import styles from "./record.module.css"; 
import MicIcon from '@mui/icons-material/Mic';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

const AudioRecorder = ({mimeType}) => {
	// Initialising variables & status code

	const INACTIVE = 0; // no recording taking place
	const ACTIVE = 1; // recording in progress
	const PAUSE = 2; // recording paused


	const [permission, setPermission] = useState(false);
	const mediaRecorder = useRef(null); // THIS ONE
	const [recordingStatus, setRecordingStatus] = useState(0);
	const [stream, setStream] = useState(null);
	const [audioChunks, setAudioChunks] = useState([]); // an array to store parts of the generated recording
	const [audio, setAudio] = useState(null);

	// no more getMicPermission
	console.log("initial stream: " + stream); 
	console.log("initial audioChunks: " + audioChunks); 
	console.log("initial audio(url): " + audio); 

	const startRecording = async () => {
		if (recordingStatus === ACTIVE) { // pause shouldn't be part of the possible cases
			alert("Recording in progress");
			return;
		}

		// Ask for Permission
		let hasPermissionAsked = false;
		let localStream = null;

		if (!permission) { // no permission granted
			if ("MediaRecorder" in window) { // window object. Check if browser supports MediaRecorder. If yes, we access this MediaRecorder API (to eventually access microphone)
				try {      
					const mediaStream = await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: false,
					}); // returns a promise that resolves successfully if the user permits access to the media.
					setPermission(true);
					setStream(mediaStream); // stream state variable = microphone obtained?
					localStream = mediaStream;

					hasPermissionAsked = true;
		
				} catch (err) { // executed if user block the microphone
					alert(err.message + "\nTo record, localhost requires access to microphone."); // display text in a dialog box that pops up on the screen
					return;
				}
			} else {
				alert("The MediaRecorder API is not supported in your browser.");
			}
		}
		
		console.log("stream in Start Record function: " + stream);
		console.log("localStream in Start Record function: " + localStream);
		

		const streamToUse = hasPermissionAsked ? localStream : stream;
		const media = new MediaRecorder(streamToUse, { type: mimeType }); //creates a new MediaRecorder object that will record a specified MediaStream
		mediaRecorder.current = media;

		// start Recording
		mediaRecorder.current.start();
		setRecordingStatus(ACTIVE);
		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);

        console.log("audioChunks in Start Recording (should be previous)");
        console.log(audioChunks);
	};

	const contRecording = () => {
		mediaRecorder.current.resume();
		setRecordingStatus(ACTIVE);
	}

	const pauseRecording = () => {
		mediaRecorder.current.pause();
		setRecordingStatus(PAUSE);
	};

	const stopRecording = () => {
		setRecordingStatus(INACTIVE);
		mediaRecorder.current.stop();

        //console.log("audioChunks in Stop");
        //console.log(audioChunks);
		mediaRecorder.current.onstop = () => { // never execute....hmm.... (if stop() was executed in pause...)
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			//console.log("audioBlob created: " + audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
			setAudio(audioUrl);
			setAudioChunks([]);
		};
	};

	return (
		<div>
			<div className={styles.serviceRecordMain}>
				
				{recordingStatus !== INACTIVE ? (		
				<div className={styles.serviceRecordPlay}>
					<button onClick={stopRecording} type="button">
						<StopCircleOutlinedIcon style = {{fontSize: "9vh"}}/>
					</button>
					{recordingStatus === ACTIVE ? ( // recording status
					<button onClick={pauseRecording} type="button">
						<PauseCircleOutlineIcon style = {{fontSize: "9vh"}}/>
					</button>
					) : ( // Pause Status
					<button onClick={contRecording} type="button">
						<PlayCircleOutlineIcon style = {{fontSize: "9vh"}}/>
					</button>
					) }
				</div> 
				) : 

				<div className={styles.serviceRecordMic}>
					<button onClick={startRecording}>
						<MicIcon style = {{fontSize: "6.5vh", alignItems: "center", color: "black"}}/>
					</button>
				</div>
				}
				
				{audio && recordingStatus === INACTIVE ? (
					<div className={styles.serviceRecordAudio}>
						<audio src={audio} controls></audio>

						<a download href={audio}>
							Download
						</a>

					</div>
				) : null}
			</div>
		</div>
	);
};

export default AudioRecorder;

	/*const getMicPermission = async () => {
		if (permission) {
			alert("Permission already granted");
			return;
		}

		if ("MediaRecorder" in window) { // window object. Check if browser supports MediaRecorder. If yes, we access this MediaRecorder API (to eventually access microphone)
			try {       
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				}); // returns a promise that resolves successfully if the user permits access to the media.
				console.log("mediaStream imm. aft.")
				console.log(mediaStream);
				setPermission(true);
				setStream(mediaStream); // stream state variable = microphone obtained?
				// oh my so it's useState setter functions are async...?

			} catch (err) { // executed if user block the microphone
				alert(err.message); // display text in a dialog box that pops up on the screen
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};*/