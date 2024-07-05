//import styles from "../styles.module.css";
import Header from "../../(components)/header";
import UploadFile from "./uploadfile";

export default async function UploadPage() {
  return (
    <div>
      <Header
      heading = "Upload"
      description = "Transcribe existing audio"
      hasHome = {true}
      />

          <UploadFile></UploadFile>
          <br></br>
      <footer>
        <p>to insert footer?</p>
      </footer>
    </div>
  );
}
