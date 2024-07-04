import styles from "../styles.module.css";
import Logout from "../../(components)/logout";
import AudioRecorder from "./recordaudio";

// include back button (components) and all the header stuff said in HomePage
// if this is the way to div, then maybe can remove styles.serviceRecord
// only if have time: CSS the footer to count from down up
// transcription text shown should be able to show and populate the entire site and you know, push the footer down
export default async function RecordPage() {
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.top}>
          <h1>Record</h1>
          <Logout />
        </div>
        <p>Real-time Transcription</p>
      </header>

        <div className={styles.serviceRecord}>
          <AudioRecorder downloadType="audio/mpeg"></AudioRecorder>
        </div>

        <div>
            <p>transcrbed text down there</p>
          </div>

      <footer>
        <p>to insert footer?</p>
      </footer>
    </div>
  );
}
