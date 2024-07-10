//import styles from "../styles.module.css";
import Header from "../../(components)/header.tsx";
import UploadFile from "./uploadfile.tsx";
import { getUsername } from "../../lib-authen.ts";

export default async function UploadPage() {
  const value = await getUsername(); // decrypt value of cookie to get username
  return (
    <div>
      <Header
        heading="Upload"
        description="Transcribe existing audio"
        hasHome={true}
        user={value}
      />
      <UploadFile></UploadFile>
    </div>
  );
}
