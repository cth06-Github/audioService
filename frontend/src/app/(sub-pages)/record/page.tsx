import AudioRecorder from "./recordaudio";
import { getUsername } from "../../lib-authen.ts";

export default async function RecordPage() {
  const value = await getUsername(); // decrypt value of cookie to get username
  return (
    <div>

      <AudioRecorder downloadType="audio/mpeg"></AudioRecorder>
    </div>
  );
}
