import styles from "../styles.module.css";
import Logout from "../../(components)/logout";
import AudioRecorder from "../record/recordaudio";
import UploadFile from "./uploadfile";

// include back button (components)
// status sent loading (circular) file sent only. probably the backend also need time to process transcription
// footer just state the multiple use cases like upload multiple files, transcribe halfway then upload another one.
// actually can just.... "transcribing..."to generalise both POST method and GET response?
// aiyah just put the transcribed test down below. DON't animate the step-by-step. The "transcribing..." & file name on the select files only finish when the output finish UNLESS got time and want to break it up
export default async function UploadPage() {
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.top}>
          <h1>Upload</h1>
          <Logout />
        </div>
        <p>Transcribe existing audio</p>
      </header>

        <div className={styles.serviceFiles}>
          <hgroup>
            <h2>Select files</h2>
            <p>1 file only</p>
          </hgroup>
          <UploadFile></UploadFile>
        </div>

      <footer>
        <p>to insert footer?</p>
      </footer>
    </div>
  );
}
