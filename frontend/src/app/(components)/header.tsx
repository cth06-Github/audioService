"use client"; // must for interactivitiy (onClick)
import { Logout, HomeButton } from "./button-common";
import styles from "./styles.module.css";

interface HeaderProps {
    heading: string; // the type of the MUI icon is a bit too long?
    description: string;
    hasHome: boolean;
}

// toogle not to have the home button
const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  return ( 
    <div className={styles.top}>
    <header>
    {props.hasHome && (
        <span className={styles.home}>
        <HomeButton/>
        </span>
    )}
      <h1>{props.heading}</h1>
      <span className={styles.login}>
        <Logout />
        </span>
    <h3>{props.description}</h3>
  </header>
  </div>
  );
}

export default Header;