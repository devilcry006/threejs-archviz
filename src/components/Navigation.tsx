function NavigationBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        top: 0,
        zIndex: 9,
        position: "absolute",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div>Archviz</div>
      <div style={{ display: "flex" }}>
        <div>Menu 1</div>
        <div>Menu 2</div>
      </div>
    </div>
  );
}

export default NavigationBar;
