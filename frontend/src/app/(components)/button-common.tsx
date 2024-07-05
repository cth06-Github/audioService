"use client"; // must for interactivitiy (onClick)
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../lib";
import { useRouter } from "next/navigation";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


export function Logout() {
  return (
    <button onClick={() => logout()}>
      <LogoutIcon />
      Logout
    </button>
  );
}

export function HomeButton() { // consider displaying it as a back button instead
  const router = useRouter();
  return (
    <button onClick={() => router.push("/home")}>
      <HomeRoundedIcon style = {{fontSize: "40px"}}/>
    </button>
  );
}
