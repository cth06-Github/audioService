/*Please IGNORE Everything below*/

/*
import "./record.module.css";

import { useEffect } from 'react';
import useRecorder from './useRecord';

const RecorderApp = () => {
  const { stateIndex, record, stopRecording, downloadAudio, audioURL } = useRecorder();

  /*
  useEffect(() => {
    // Update UI based on stateIndex
    // You can also handle cases where stateIndex is '', indicating no mediaDevices support
  }, [stateIndex]);*/

  /*
  const renderControls = () => {
    switch (stateIndex) {
      case 0: // Initial state
        return (
          <>
            <button onClick={record}>Start Recording</button>
          </>
        );

      case 1: // Record state
        return (
          <>
            <p>Recording...</p>
            <button onClick={stopRecording}>Stop Recording</button>
          </>
        );

      case 2: // Download state
        return (
          <>
            <audio controls src={audioURL}></audio>
            <button onClick={record}>Record Again</button>
            <button onClick={downloadAudio}>Download Audio</button>
          </>
        );

      default:
        return <p>Your browser does not support mediaDevices</p>;
    }
  };

  return (
    <div>
      <div className="display"></div> {/* Placeholder for display messages }
      <div className="controllers">
        {renderControls()}
      </div>
    </div>
  );
};

export default RecorderApp;*/





// this will be more necessary if I implement a navigation bar

/*
import "./header.css";

const Header = ({content}) => {
  return (
    <header className="header">
      {content}
    </header>
  );
};

export default Header;
*/