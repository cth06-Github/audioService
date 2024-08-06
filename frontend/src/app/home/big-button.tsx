"use client";
import Link from "next/link";
import styles from "./styles.module.css";

interface ButtonProps {
  name: any;
  description: string;
  routing: string;
}

const BigButton: React.FC<ButtonProps> = (props): JSX.Element => {
  return (
    <button className={styles.serviceButton} type="button">
      <Link href={props.routing}>
        <span>{props.name}</span>
        <p>{props.description}</p>
      </Link>
    </button>
  );
};

export default BigButton;