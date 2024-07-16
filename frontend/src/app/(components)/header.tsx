"use client"; // must for interactivitiy (onClick)
import { Logout, HomeButton } from "./button-common";
import styles from "./styles.module.css";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import { useState } from "react";

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
  const [menu, toggleMenu] = useState<boolean>(false);

  return (
  <div style ={{alignItems: "flex-end", justifyContent: "flex-start"}}>
    <div className={styles.top}>
      <header>
        <span className={styles.menu}>
          <button onClick={() => {toggleMenu(!menu)}}>
          <MenuIcon></MenuIcon>
          </button>
        </span>
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

      {menu &&
      <div className={styles.menuOpen}>
      <h6>
        <PersonIcon />
        {user}
      </h6>
      <ul>
      {hasHome && <HomeButton onClickFunc = {onClickFuncHome}/>}
      </ul>
      <ul>
      <span>
        <Logout onClickFunc = {onClickFuncLogout}/>
      </span>
      </ul>
    </div>
      }
    </div>
    
  );
};

export default Header;

/*
      <div className={styles.menuOpen}>
        <h6>
          <PersonIcon />
          {user}
        </h6>
        {hasHome && <HomeButton onClickFunc = {onClickFuncHome}/>}
        <span className={styles.menuOpen1}>
          <Logout onClickFunc = {onClickFuncLogout}/>
        </span>
      </div>
      */
