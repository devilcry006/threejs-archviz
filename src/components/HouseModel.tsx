import { Html } from "@react-three/drei";
import { useRef, useState } from "react";

const Capsule = ({ text, moveTo }: { text: string; moveTo: () => void }) => {
  const [hoverd, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  return (
    <div
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      onClick={moveTo}
      style={{
        background: hoverd ? "white" : "transparent",
        color: "black",
        borderRadius: "25px",
        border: "2px white solid",
        height: "16px",
        width: "16px",
        cursor: "pointer",
        transition: "ease-out 0.5s",
      }}
    >
      {/* {text} */}
    </div>
  );
};

export default function HouseModel({
  cameraRef,
  currentRoom,
  scene,
  navigation,
  handleMove,
}) {
  console.log(cameraRef.current);

  return (
    <>
      <primitive object={scene}>
        {navigation.map((item) => (
          <Html
            as="div"
            key={item.id}
            position={item.position}
            style={{ display: currentRoom === "default" ? "block" : "none" }}
          >
            <Capsule
              text={item.name}
              moveTo={() => handleMove(item.position)}
            />
          </Html>
        ))}
      </primitive>
    </>
  );
}
