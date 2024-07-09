import styles from "./styles.module.css";
import { Delete } from "@/app/(components)/button-common";

interface TranscriptProps {
  transcript: string;
  withInfo?: string; // must write ? to make it possible for the prop to be optional
  deleteFunc: () => void
}

// toogle not to have the home button
const TranscriptBox: React.FC<TranscriptProps> = ({
  transcript,
  withInfo = "",
  deleteFunc
}: TranscriptProps): JSX.Element => {
  return (
    // by default, withInfo is blank
    <div className={styles.transcribe}>
      <h4>
        Transcribed Text
        {withInfo !== "" &&
        <small>
          <small>{` -- ${withInfo}`}</small>
        </small>}
        {transcript && <span><Delete onClick = {deleteFunc}/></span>}
      </h4>
      <p>{transcript ? transcript : "No Transcribed Text shown"}</p>
    </div>
  );
};

export default TranscriptBox;

/*
      <div className={styles.transcribe}>
          <h4>
            Transcribed Text:
          </h4>
        <p>
          {transcribedContiText.current ? transcribedContiText.current : "No Text Transcribed"}
        </p>
      </div>*/

/*
    <div className={styles.transcribe}>
        {transcribedFile ? (
          <h4>
            Transcribed Text -{" "}
            <small>
              <small>{`${transcribedFile}`}</small>
            </small>
          </h4>
        ) : (
          <h4>Transcribed Text</h4>
        )}
        <p>
          {isTranscribeDone ? transcribedText : "No file has been transcribed"}
        </p>
      </div>*/
