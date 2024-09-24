"use client"; // must for interactivitiy (onClick)
import { useState } from "react";
import { HomeButton, Logout } from "./buttons-common";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";

interface HeaderProps {
  heading: string;
  description: string;
  hasHome: boolean; // allows toggling of home button (enabled/disabled)
  user: string;
  onClickFuncHome?: () => void;
  onClickFuncLogout?: () => void;
}

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
    <>
      <div>
        <header>
          <div className={styles.leftHead}>
            <span className={styles.menu}>
              <button onClick={handleToggleMenu} type="button">
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

      <div className={`${styles.menuOpen} menuOpenSlide`}>
        <style jsx>
          {`
            .menuOpenSlide {
              width: ${menu ? "90vw" : "0px"};
              padding: ${menu ? "120px 10vw" : "0px"};
              box-shadow: ${menu && "0px 0px 5px 10vw rgba(0, 0, 0, 0.5)"};
            }
          `}
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
    </>
  );
};

export default Header;