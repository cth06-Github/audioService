import Header from "../../(components)/header";
import AudioRecorder from "./recordaudio";
import { getUsername } from "../../lib-authen.ts";

export default async function RecordPage() {
  const value = await getUsername(); // decrypt value of cookie to get username
  return (
    <div>
      <Header
        heading="Record"
        description="Real-time Transcription"
        hasHome={true}
        user={value}
      />
      <AudioRecorder downloadType="audio/mpeg"></AudioRecorder>
    </div>
  );
}
