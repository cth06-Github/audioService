import styles from "./styles.module.css";
import Login from "./login";

export default async function LoginPage() {
  return (
    <div>
      <header>
        <h1>Transcription Service</h1>
      </header>
      <Login></Login>
    </div>
  );
}
