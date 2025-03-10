import { CameraControls } from "@react-three/drei";
import { Dispatch, useRef } from "react";
import { Object3D } from "three";

export const useCustomCamera = (
  currentRoom: string,
  setRoom: Dispatch<string>
) => {
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
      cameraRef.current.minPolarAngle = 0;
      cameraRef.current.maxPolarAngle = Math.PI;
      setRoom(roomName);
    }
  };
  const handleExit = () => {
    if (cameraRef.current) {
      cameraRef?.current.setPosition(0, 7, 12, true);
      cameraRef?.current.setTarget(0, 0, 0, true);
      cameraRef.current.minPolarAngle = Math.PI / 4;
      cameraRef.current.maxPolarAngle = Math.PI / 2;
      setRoom("default");
    }
  };

  const handleNext = (navigation: Object3D[], navigate: "next" | "prev") => {
    const currentIndex = navigation.findIndex(
      (item) => item.name === currentRoom
    );

    if (navigate === "next") {
      const navigateObject =
        currentIndex === navigation.length - 1
          ? navigation[0]
          : navigation[currentIndex + 1];
      handleMove(navigateObject.position, navigateObject.name);
    } else if (navigate === "prev") {
      const navigateObject =
        currentIndex === 0
          ? navigation[navigation.length - 1]
          : navigation[currentIndex - 1];
      handleMove(navigateObject.position, navigateObject.name);
    }
  };

  return { cameraRef, handleMove, handleExit, handleNext };
};
