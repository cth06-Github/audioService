import styles from "./styles.module.css";
import Header from "../(components)/header";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getUsername } from "../lib-authen.ts";

export default async function HomePage() {
  const value = await getUsername(); // decrypt value of cookie to get username
  
  return (
    <div style = {{minHeight: "100vh", justifyContent: "flex-start"}}>
      <Header
        heading="Welcome!"
        description="Transcribe"
        hasHome={false}
        user={value}
      />
      <div className={styles.serviceGroup}>
        <BigButton
          name={<MicIcon sx={{fontSize: { xs: 90, sm: 100, md: 150, lg: 200 } }} />}
          description="Record on the go"
          routing="/record"
        />
        <BigButton
          name={<FileUploadIcon sx={{fontSize: { xs: 90, sm: 100, md: 150, lg: 200 } }} />}
          description="Upload audio"
          routing="/upload"
        />
      </div>
    </div>
  );
}
