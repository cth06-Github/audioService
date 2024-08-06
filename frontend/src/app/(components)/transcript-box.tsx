import styles from "./styles.module.css";
import { DeleteButton } from "@/app/(components)/buttons-common";

interface TranscriptProps {
  transcript: string;
  withInfo?: string;
  deleteFunc: () => void;
}

const TranscriptBox: React.FC<TranscriptProps> = ({
  transcript,
  withInfo = "",
  deleteFunc,
}: TranscriptProps): JSX.Element => {
  return (
    // by default, withInfo is blank
    <div className={styles.transcribeContainer}>
      <div className={styles.transcribeHeading}>
        <h2>
          Transcribed Text
          {withInfo !== "" && (
            <small>
              <small>{` -- ${withInfo}`}</small>
            </small>
          )}
        </h2>
        {transcript && <DeleteButton onClick={deleteFunc} />}
      </div>
      <div className={styles.transcribeBox}>
        <p>{transcript ? transcript : "No Transcribed Text shown"}</p>
      </div>
    </div>
  );
};

export default TranscriptBox;