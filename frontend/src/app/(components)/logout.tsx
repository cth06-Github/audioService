"use client"; // must for interactivitiy (onClick)
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../lib";

export default function Logout() {
  return (
    <button onClick={() => logout()}>
      <LogoutIcon />
      Logout
    </button>
  );
}
