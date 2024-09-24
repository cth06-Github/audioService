import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingPage() {
  return (
    <div style={{ height: "100vh" }}>
      <CircularProgress />
      <p style={{ fontWeight: "bold" }}>Loading...</p>
    </div>
  );
}
