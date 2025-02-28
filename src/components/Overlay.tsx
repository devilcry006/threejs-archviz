export default function Overlay({
  room,
  exit,
}: {
  room: string;
  exit: () => void;
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "2rem" }}>{room}</div>
        <button
          style={{ width: "max-content", background: "rgba(255,255,255,0.2)" }}
          onClick={exit}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
