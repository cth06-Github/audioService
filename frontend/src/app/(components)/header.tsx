"use client"; // must for interactivitiy (onClick)
import { Logout, HomeButton } from "./button-common";
import styles from "./styles.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";

interface HeaderProps {
  heading: string; // the type of the MUI icon is a bit too long?
  description: string;
  hasHome: boolean;
  user: string;
  onClickFuncHome?: () => void // hmm is it repeat?
  onClickFuncLogout?: () => void 
}

// toggle not to have the home button
export const Header: React.FC<HeaderProps>  = ({
  heading, 
  description,
  hasHome,
  user,
  onClickFuncHome,
  onClickFuncLogout
}: HeaderProps): JSX.Element => {
  return (
    <div className={styles.top}>
      <header>
        <span className={styles.home}>
          {hasHome && <HomeButton onClickFunc = {onClickFuncHome}/>}
          <p style={{ display: "flex", alignItems: "center" }}>
            <PersonIcon />
            {user}
          </p>
        </span>
        <h1>{heading}</h1>
        <span className={styles.login}>
          <Logout onClickFunc = {onClickFuncLogout}/>
        </span>
        <h3>{description}</h3>
      </header>
    </div>
  );
};

export default Header;
