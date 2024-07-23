import UploadFile from "./uploadfile.tsx";
import { getUsername } from "../../lib-authen.ts";

export default async function UploadPage() {
  const username = await getUsername(); // decrypt value of cookie to get username

  return (
    <div style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <UploadFile username={username}></UploadFile>
    </div>
  );
}
