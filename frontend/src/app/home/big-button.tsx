"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface ButtonProps {
  name: any;
  description: string;
  routing: string;
}

const BigButton: React.FC<ButtonProps> = (props): JSX.Element => {
  const router = useRouter();
  return (
    <button
      className={styles.serviceButton} onClick={() => router.push(props.routing)}
    >
      <span>{props.name}</span>
      <h5>{props.description}</h5>
    </button>
  );
};

export default BigButton;

