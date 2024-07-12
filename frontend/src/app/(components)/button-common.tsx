"use client"; // must for interactivitiy (onClick)
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { logout, toHome } from "../lib-authen";
import { useRouter, redirect } from "next/navigation";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

interface onClickFunc {
  onClickFunc?: () => void;
}

export const Logout: React.FC<onClickFunc>  = ({
  onClickFunc = () => logout()
}: onClickFunc): JSX.Element => {
  return (
    <button onClick = {onClickFunc}>
      <LogoutIcon />
      Logout
    </button>
  );
}
// use client this page
export const HomeButton: React.FC<onClickFunc>  = ({
  onClickFunc = () => { console.log("huh"); toHome()},
}: onClickFunc): JSX.Element => {
  // consider displaying it as a back button instead
  
  return ( 
// a bit hard if the routing for the button is just like this might want to do other function. So pass function may be better
    <button onClick = {onClickFunc}>
      <HomeRoundedIcon style={{ fontSize: "40px" }} />
    </button>
  );
}

interface DeleteProps {
  onClick: () => void;
}
export const Delete: React.FC<DeleteProps> = (props): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundColor: "transparent", padding: "0px", border: "none" }}
    >
      <DeleteIcon style={{ color: "#789DE5" }} />
    </button>
  );
};
