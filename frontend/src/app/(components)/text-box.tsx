import styles from "./styles.module.css";
import { DeleteButton } from "@/app/(components)/buttons-common";

interface TextProps {
  processedText: string;
  withInfo?: string;
  deleteFunc: () => void;
}

const TextBox: React.FC<TextProps> = ({
  processedText,
  withInfo = "",
  deleteFunc,
}: TextProps): JSX.Element => {
  return (
    // by default, withInfo is blank
    <div className={styles.textContainer}>
      <div className={styles.processedTextHeading}>
        <h2>
          Processed Text
          {withInfo !== "" && (
            <small>
              <small>{` -- ${withInfo}`}</small>
            </small>
          )}
        </h2>
        {processedText && <DeleteButton onClick={deleteFunc} />}
      </div>
      <div className={styles.textBox}>
        <p>{processedText ? processedText : "No Processed Text shown"}</p>
      </div>
    </div>
  );
};

export default TextBox;