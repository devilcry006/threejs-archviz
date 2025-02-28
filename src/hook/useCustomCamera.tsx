import { CameraControls } from "@react-three/drei";
import { Dispatch, useRef } from "react";

export const useCustomCamera = (setRoom: Dispatch<string>) => {
  const cameraRef = useRef<CameraControls>(null);
  const handleMove = (
    position: { x: number; y: number; z: number },
    roomName: string
  ) => {
    if (cameraRef.current) {
      cameraRef.current.setPosition(position.x, position.y, position.z, true);
      cameraRef.current.setTarget(position.x, position.y, position.z, true);

      const { x, y, z } = position;
      const offset = 0.001; // Tiny offset to prevent snapping

      cameraRef.current.setLookAt(x, y, z, x + offset, y, z, true); // Smooth transition
      setRoom(roomName);
    }
  };
  const handleExit = () => {
    if (cameraRef.current) {
      cameraRef?.current.setPosition(-20, 5, 30, true);
      cameraRef?.current.setTarget(0, 0, 0, true);
      setRoom("default");
    }
  };

  return { cameraRef, handleMove, handleExit };
};
