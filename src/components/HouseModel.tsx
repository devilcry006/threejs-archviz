import { Html } from "@react-three/drei";
import { useState } from "react";
import { Object3D, Vector3 } from "three";

interface PropsHouse {
  currentRoom: string;
  scene: Object3D;
  navigation: Object3D[];
  handleMove: (position: Vector3, roomName: string) => void;
}

const Capsule = ({ moveTo }: { moveTo: () => void }) => {
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
    ></div>
  );
};

export default function HouseModel({
  currentRoom,
  scene,
  navigation,
  handleMove,
}: PropsHouse) {
  return (
    <>
      <primitive object={scene} castShadow>
        {navigation.map((item: Object3D) => (
          <Html
            as="div"
            key={item.id}
            position={item.position}
            style={{ display: currentRoom === "default" ? "block" : "none" }}
          >
            <Capsule moveTo={() => handleMove(item.position, item.name)} />
          </Html>
        ))}
      </primitive>
    </>
  );
}
