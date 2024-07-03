import styles from "./styles.module.css";
import Logout from "../components/logout";
import AudioRecorder from "./recordaudio";
import UploadFile from "./uploadfile";

export default async function UploadPage() {
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.top}>
          <h1>Transcribe now!</h1>
          <Logout />
        </div>
        <p>Either record or upload existing audio!</p>
      </header>

      <div className={styles.serviceBox}>
        <div className={styles.serviceStream}>
          <h2>Record</h2>
          <AudioRecorder downloadType="audio/mpeg"></AudioRecorder>
        </div>

        <div className={styles.serviceFiles}>
          <h2>Upload</h2>
          <p>1 file only</p>
          <UploadFile></UploadFile>
        </div>
      </div>

      <footer>
        <p>to insert footer?</p>
      </footer>
    </div>
  );
}
