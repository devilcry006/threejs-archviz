export default function Overlay({
  room,
  exit,
}: {
  room: string;
  exit: () => void;
}) {
  return (
    <div
      style={{
        background: "transparent",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
        position: "absolute",
        bottom: "10%",
        margin: "auto",
      }}
    >
      {room !== "default" ? <button onClick={exit}>Exit</button> : null}
    </div>
  );
}
