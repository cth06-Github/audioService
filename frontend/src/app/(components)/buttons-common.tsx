"use client"; // must for interactivitiy (onClick)
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { logout } from "../lib-authen";
import { useRouter } from "next/navigation";

interface onClickFunc {
  onClickFunc?: () => void;
}

export const Logout: React.FC<onClickFunc> = ({
  onClickFunc = () => logout(),
}: onClickFunc): JSX.Element => {
  return (
    <button onClick={onClickFunc} type="button" style={{ padding: "4px" }}>
      <LogoutIcon />
      Logout
    </button>
  );
};

export const HomeButton: React.FC<onClickFunc> = ({
  onClickFunc,
}: onClickFunc): JSX.Element => {
  const router = useRouter();
  const toHome = () => {
    console.log("hmm");
    router.push("/home");
  };
  return (
    <button
      onClick={onClickFunc ? onClickFunc : toHome}
      type="button"
      style={{ padding: "4px" }}
    >
      <HomeRoundedIcon style={{ fontSize: "40px" }} />
    </button>
  );
};

interface DeleteProps {
  onClick: () => void;
}
export const DeleteButton: React.FC<DeleteProps> = (props): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      style={{
        backgroundColor: "transparent",
        padding: "0px",
        border: "none",
        display: "flex",
      }}
    >
      <DeleteIcon style={{ color: "#789DE5" }} />
    </button>
  );
};
