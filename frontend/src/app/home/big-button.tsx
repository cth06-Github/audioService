"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/app/theme-materialUI";

interface ButtonProps {
  name: any;
  description: string;
  routing: string;
}

const BigButton: React.FC<ButtonProps> = (props): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <button className={styles.serviceButton} type="button">
        <Link href={props.routing}>
          <span>{props.name}</span>
          <p>{props.description}</p>
        </Link>
      </button>
    </ThemeProvider>
  );
};

export default BigButton;
