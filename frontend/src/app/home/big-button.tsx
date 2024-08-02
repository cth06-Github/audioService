"use client";
import styles from "./styles.module.css";
import Link from "next/link";

interface ButtonProps {
  name: any;
  description: string;
  routing: string;
}

const BigButton: React.FC<ButtonProps> = (props): JSX.Element => {
  return (
    <Link className={styles.serviceButton} href={props.routing} prefetch={false}>
      <span>{props.name}</span>
      <p>{props.description}</p>
    </Link>
  );
};

export default BigButton;
// () => router.push(props.routing)
