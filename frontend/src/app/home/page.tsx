import styles from "./styles.module.css";
import Header from "../(components)/header";
import BigButton from "./big-button";
import MicIcon from "@mui/icons-material/Mic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getUsername } from "../lib-authen.ts";

export default async function HomePage() {
  const value = await getUsername(); // decrypt value of cookie to get username

  return (
    <div style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <Header
        heading="Welcome!"
        description="Speech-To-Text"
        hasHome={false}
        user={value}
      />
      <div className={styles.serviceGroup}>
        <BigButton
          name={
            <MicIcon
              sx={{
                fontSize: {
                  mobileTablet: 100,
                  tinyTablet: 50,
                  bigTablet: 60,
                  computerSmall: 110,
                  computerMid: 150,
                  computerBig: 200,
                  biggerScreen: 240,
                  monitor: 250,
                },
              }}
            />
          }
          description="Record on the go"
          routing="/record"
        />
        <BigButton
          name={
            <FileUploadIcon
              sx={{
                fontSize: {
                  mobileTablet: 100, // mobileTablet css styling changes thus can be larger
                  tinyTablet: 50,
                  bigTablet: 60,
                  computerSmall: 110,
                  computerMid: 150,
                  computerBig: 200,
                  biggerScreen: 240,
                  monitor: 250,
                },
              }}
            />
          }
          description="Upload audio"
          routing="/upload"
        />
      </div>
    </div>
  );
}