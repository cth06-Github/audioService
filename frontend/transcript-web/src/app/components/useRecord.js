"use client"; 

import { useState, useEffect } from 'react';

const useRecorder = () => {
  const [stateIndex, setStateIndex] = useState(0); // 0 for Initial state
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [audioURL, setAudioURL] = useState('');

  useEffect(() => {
    const setupMediaRecorder = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {
        try {
          // ask for permission to use audio devices
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log(stream);

          // record audio
          const recorder = new MediaRecorder(stream); 
          console.log(recorder);

          recorder.ondataavailable = (e) => {
            setChunks((prevChunks) => [...prevChunks, e.data]);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            setChunks([]);
            const url = window.URL.createObjectURL(blob);
            setAudioURL(url);
          };

          setMediaRecorder(recorder);
        } catch (error) {
          console.log('Following error has occurred: ', error);
        }
      } else {
        setStateIndex('');
        // Handle application state when mediaDevices are not supported
      }
    };

    setupMediaRecorder();

    // Clean up media recorder when component unmounts
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, []);

  const record = () => {
    if (mediaRecorder) {
      setStateIndex(1); // Record state
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      setStateIndex(2); // Download state
      mediaRecorder.stop();
    }
  };

  const downloadAudio = () => {
    if (audioURL) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioURL;
      downloadLink.setAttribute('download', 'audio');
      downloadLink.click();
    }
  };

  return { stateIndex, record, stopRecording, downloadAudio, audioURL };
};

export default useRecorder;
