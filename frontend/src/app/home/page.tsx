import styles from "./styles.module.css";
import Header from "../(components)/header";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getUsername } from "../lib-authen.ts";

export default async function HomePage() {
  const value = await getUsername(); // decrypt value of cookie to get username

  return (
    <div>
      <Header
        heading="Welcome!"
        description="Transcribe at your fingertips"
        hasHome={false}
        user={value}
      />
      <div className={styles.serviceBox}>
        <BigButton
          name={<MicIcon sx={{fontSize: { xs: 90, sm: 100, md: 150, lg: 200 } }} />}
          description="Record on the go"
          routing="/record"
        />
        <BigButton
          name={<FileUploadIcon sx={{fontSize: { xs: 90, sm: 100, md: 150, lg: 200 } }} />}
          description="Upload existing audio"
          routing="/upload"
        />
      </div>
    </div>
  );
}
