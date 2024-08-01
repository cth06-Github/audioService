import UploadFile from "./upload-file.tsx";
import { getUsername } from "../../lib-authen.ts";
import { NavDialogProvider } from '../dialog(nav)-logic.tsx'

export default async function UploadPage() {
  const username = await getUsername(); // decrypt value of cookie to get username

  return (
    <div style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <NavDialogProvider>
      <UploadFile username={username}></UploadFile>
      </NavDialogProvider>
    </div>
  );
}
