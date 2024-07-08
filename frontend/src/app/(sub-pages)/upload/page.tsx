//import styles from "../styles.module.css";
import Header from "../../(components)/header";
import UploadFile from "./uploadfile";
import { getUsername } from "../../lib.ts";

export default async function UploadPage() {
  const value = await getUsername(); // decrypt value of cookie to get username
  return (
    <div>
      <Header
      heading = "Upload"
      description = "Transcribe existing audio"
      hasHome = {true}
      user = {value}
      />
          <UploadFile></UploadFile>
          <br></br>
    </div>
  );
}
