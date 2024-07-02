import styles from "./login.module.css";
import Login from "./login";

export default async function LoginPage() {
  return (
    <div className={styles.main}>
      <h1>Transcription Service</h1>
      <Login></Login>
    </div>
  );
}