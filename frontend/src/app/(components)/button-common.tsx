"use client"; // must for interactivitiy (onClick)
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { logout } from "../lib";
import { useRouter } from "next/navigation";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export function Logout() {
  return (
    <button onClick={() => logout()}>
      <LogoutIcon />
      Logout
    </button>
  );
}

export function HomeButton() {
  // consider displaying it as a back button instead
  const router = useRouter();
  return (
    <button onClick={() => router.push("/home")}>
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
