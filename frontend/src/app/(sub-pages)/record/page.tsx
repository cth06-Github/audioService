import AudioRecorder from "./record-audio.tsx";
import { getUsername } from "../../lib-authen.ts";
import { PopupProvider } from '../dialog(nav)-logic.tsx'

export default async function RecordPage() {
  const username = await getUsername(); // decrypt value of cookie to get username
  return (
    <div style={{ minHeight: "100vh", justifyContent: "flex-start" }}>
      <PopupProvider>
      <AudioRecorder
        downloadType="audio/mpeg"
        username={username}
      ></AudioRecorder>
      </PopupProvider>
    </div>
  ); // CAN YOU REALLY POPUP PROVIDER? because use client? I don't know.
}
