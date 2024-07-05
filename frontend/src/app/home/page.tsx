import styles from "./styles.module.css";
import Logout from "../(components)/logout";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// need to CSS the button (big big buttons) USE ICONS, import
// consider making a header component then just import can already + #props
// account name with username

// Record; Record on the go! && Upload; Upload existing audio!...Title | snippet at button bottom
export default async function HomePage() {
  return (
    <div>
      <header>
        <div className={styles.top}>
          <h1>Welcome!</h1>
          <Logout />
        </div>
        <p>Transcribe at your fingertips</p>
      </header>

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
