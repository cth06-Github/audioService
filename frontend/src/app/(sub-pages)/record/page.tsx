import AudioRecorder from "./recordaudio";
import { getUsername } from "../../lib-authen.ts";

export default async function RecordPage() {
  const username = await getUsername(); // decrypt value of cookie to get username
  return ( // stop gap measure
    <div>
      <AudioRecorder downloadType="audio/mpeg" username = {username}></AudioRecorder>
    </div>
  );
}
