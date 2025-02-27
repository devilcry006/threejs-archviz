import { CameraControls } from "@react-three/drei";
import { useRef } from "react";

export default function CustomCameraController() {
  const cameraRef = useRef(null);

  return <CameraControls ref={cameraRef} />;
}
