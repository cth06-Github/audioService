import styles from "./styles.module.css";
import { Logout } from "../(components)/button-common";
import Header from "../(components)/header";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// account name with username
export default async function HomePage() {
  return (
    <div>
      <Header
      heading = "Welcome!"
      description = "Transcribe at your fingertips"
      hasHome = {false}
      />

      <div className={styles.serviceBox}>
       <BigButton
        name = {<MicIcon style={{ fontSize: "40vh"}}/>}
        description = "Record on the go"
        routing = "/record"
       />
      <BigButton
        name = {<FileUploadIcon style={{ fontSize: "40vh"}}/>}
        description = "Upload existing audio"
        routing = "/upload"
       />
      </div>
    </div>
  );
}
