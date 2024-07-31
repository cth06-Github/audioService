"use client"; // must for interactivitiy (onClick)
import { Logout, HomeButton } from "./button-common";
import styles from "./styles.module.css";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

interface HeaderProps {
  heading: string; 
  description: string;
  hasHome: boolean;
  user: string;
  onClickFuncHome?: () => void; // hmm is it repeat?
  onClickFuncLogout?: () => void;
}

// toggle not to have the home button
export const Header: React.FC<HeaderProps> = ({
  heading,
  description,
  hasHome,
  user,
  onClickFuncHome,
  onClickFuncLogout,
}: HeaderProps): JSX.Element => {
  const [menu, setMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div style={{ alignItems: "flex-end", justifyContent: "flex-start" }}>
      <div className={styles.top}>
        <header>
          <div className={styles.leftHead}>
            <span className={styles.menu}>
              <button onClick={handleToggleMenu}>
                <MenuIcon></MenuIcon>
              </button>
              {menu && (
                <h3>
                  <PersonIcon />
                  {user}
                </h3>
              )}
            </span>
            <span className={styles.home}>
              {hasHome && (
                <span>
                  <HomeButton onClickFunc={onClickFuncHome} />
                </span>
              )}
              <span>
                <p style={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon />
                  {user}
                </p>
              </span>
            </span>
          </div>
          <div className={styles.centerHead}>
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
          <div className={styles.rightHead}>
            <span className={styles.logout}>
              <Logout onClickFunc={onClickFuncLogout} />
            </span>
          </div>
        </header>
      </div>
     
      <div className={`${styles.menuOpen} menuOpenAlt`}>
        <style jsx>
          {`.menuOpenAlt {
          width: ${menu ? "90vw" : "0px"}; 
          padding: ${menu ? "120px 10vw" : "0px"};
          box-shadow: ${menu && "0px 0px 5px 10vw rgba(0, 0, 0, 0.5)"}
          }`
          }
        </style>
        
        {menu && (
          <div>
            <ul>{hasHome && <HomeButton onClickFunc={onClickFuncHome} />}</ul>
            <ul>
              <span>
                <Logout onClickFunc={onClickFuncLogout} />
              </span>
            </ul>
          </div>
      )}
      </div>
    </div>
  );
};

export default Header;