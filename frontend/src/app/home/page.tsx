import styles from "./styles.module.css";
import Logout from "../(components)/logout";

// need to CSS the button (big big buttons) USE ICONS, import
// consider making a header component then just import can already + #props
// account name with username

// Record on the go! && Upload existing audio!...snippet at button bottom
export default async function HomePage() {
  return (
    <div>
      <header>
        <div className={styles.top}>
          <h1>Welcome!</h1>
          <Logout />
        </div>
        <p>Transcribe at your fingertips</p>
      </header>

      <div className={styles.serviceBox}>

        <div className={styles.serviceRecord}>
          <button>Record</button>
        </div>

        <div className={styles.serviceFiles}>
          <button>Upload</button>
        </div>

      </div>

    </div>
  );
}
