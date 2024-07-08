import styles from "./styles.module.css";
import Header from "../(components)/header";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getUsername } from "../lib.ts";


export default async function HomePage() {

  const value = await getUsername(); // decrypt value of cookie to get username

  return (
    <div>
        <Header
        heading = "Welcome!"
        description = "Transcribe at your fingertips"
        hasHome = {false}
        user = {value}
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
