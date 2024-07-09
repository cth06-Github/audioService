"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface ButtonProps {
  name: any; // the type of the MUI icon is a bit too long?
  description: string;
  routing: string;
}

const BigButton: React.FC<ButtonProps> = (props): JSX.Element => {
  const router = useRouter();
  return (
    <button
      className={styles.serviceButton}
      onClick={() => router.push(props.routing)}
    >
      <span>{props.name}</span>
      <h3>{props.description}</h3>
    </button>
  );
};

export default BigButton;
