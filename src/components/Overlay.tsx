import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton } from "@mui/material";

export default function Overlay({
  room,
  exit,
  next,
  prev,
}: {
  room: string;
  exit: () => void;
  next: () => void;
  prev: () => void;
}) {
  if (room === "default") return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(5px)",
        width: "100%",
        display: "flex",
        zIndex: 10,
        minHeight: "150px",
        position: "fixed",
        bottom: 0,
        left: 0,
        margin: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          style={{ width: "max-content", background: "rgba(255,255,255,0.2)" }}
          onClick={prev}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: "white", fontSize: "2rem" }}>{room}</div>
            <button
              style={{
                width: "max-content",
                background: "rgba(255,255,255,0.2)",
              }}
              onClick={exit}
            >
              Exit
            </button>
          </div>
        </div>
        <IconButton
          style={{ width: "max-content", background: "rgba(255,255,255,0.2)" }}
          onClick={next}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
