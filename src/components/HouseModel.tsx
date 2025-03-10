import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Object3D, Vector3 } from "three";
import * as THREE from "three";

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
  // Enable castShadow on all meshes in the model
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scene.traverse((node: any) => {
      if (node?.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }

      if (node.isMesh && node.name === "Glass") {
        node.material = new THREE.MeshPhysicalMaterial({
          transmission: 0.9, // Glass transparency
          thickness: 0.5, // Adds depth
          roughness: 0, // Smooth surface
          clearcoat: 1, // Reflection
          clearcoatRoughness: 0,
          metalness: 0,
          color: "white",
        });
      }
    });
  }, [scene]);

  return (
    <>
      <primitive object={scene} castShadow>
        {navigation?.map((item: Object3D) => (
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
