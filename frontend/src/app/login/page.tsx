"use client"
import Login from "./login";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  return (
    <div>
      <header>
        <h1>Transcription Service</h1>
      </header>
      <Login/>
    </div>
  );
}
