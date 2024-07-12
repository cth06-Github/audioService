//import styles from "../styles.module.css";
import Header from "../../(components)/header.tsx";
import UploadFile from "./uploadfile.tsx";
import { getUsername } from "../../lib-authen.ts";

export default async function UploadPage() {
  const value = await getUsername(); // decrypt value of cookie to get username

  // probably also don't want people to leave page when file is in the middle transcribing..... 
  return (
    <div>
      
      <UploadFile username = {value}></UploadFile>
    </div>
  );
}
