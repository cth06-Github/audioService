"use client"; // must for interactivitiy (onClick)
import { Logout, HomeButton } from "./button-common";
import styles from "./styles.module.css";
import PersonIcon from '@mui/icons-material/Person';

interface HeaderProps {
    heading: string; // the type of the MUI icon is a bit too long?
    description: string;
    hasHome: boolean;
    user: string;
}

// toogle not to have the home button
const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  
  return ( 
    <div className={styles.top}>
    <header>
    <span className={styles.home}>
    {props.hasHome && (
        <HomeButton/>
    )}
    <p style = {{display: "flex", alignItems: "center"}}><PersonIcon/>{props.user}</p>
    </span>
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