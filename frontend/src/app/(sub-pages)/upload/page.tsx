import UploadFile from "./upload-file.tsx";
import { getUsername } from "../../lib-authen.ts";
import { NavDialogProvider } from "../dialog(nav)-logic.tsx";
import { isMobileDevice } from "@/app/lib-device.ts";

export default async function UploadPage() {
  const username: string = await getUsername(); // decrypt value of cookie to get username
  const mobile: boolean = await isMobileDevice();

  return (
    <div style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <NavDialogProvider>
        <UploadFile username={username} isMobileUAparse={mobile}></UploadFile>
      </NavDialogProvider>
    </div>
  );
}
