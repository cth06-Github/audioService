import { useState, useRef } from "react";
import styles from "./record.module.css"; 

const AudioRecorder = () => {
    const mimeType = "audio/webm";

	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null); // THIS ONE

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [audio, setAudio] = useState(null);

	const [audioChunks, setAudioChunks] = useState([]); // an array to store parts of the generated recording

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) { // window object. Check if browser supports MediaRecorder. If yes, we access this MediaRecorder API (to eventually access microphone)
			try {       
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				}); // returns a promise that resolves successfully if the user permits access to the media.
				setPermission(true);
				setStream(mediaStream); // stream state variable = microphone obtained?
			} catch (err) { // executed if user block the microphone
				alert(err.message); // display text in a dialog box that pops up on the screen
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: mimeType }); //creates a new MediaRecorder object that will record a specified MediaStream

        console.log("mediaRecorder before media");
        console.log(mediaRecorder.current);

		mediaRecorder.current = media;

        console.log("mediaRecorder after media");
        console.log(mediaRecorder.current);

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);

        console.log("audioChunks in Start");
        console.log(audioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

        console.log("audioChunks in Stop");
        console.log(audioChunks);
		mediaRecorder.current.onstop = () => {
            console.log("still can")
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			console.log("still can2")
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log("still can3")

			setAudio(audioUrl);
            console.log("still can4")

			setAudioChunks([]);
            console.log("still can5")
		};
	};

	return (
		<div>
				<div className={styles.serviceRecord}>
					{!permission ? (
						<button onClick={getMicrophonePermission} type="button">
							Get Microphone
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
				</div>
				{audio ? (
					<div className="audio-player">
						<audio src={audio} controls></audio>
						<a download href={audio}>
							Download Recording
						</a>
					</div>
				) : null}
		</div>
	);
};

export default AudioRecorder;