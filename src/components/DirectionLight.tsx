import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLight } from "three";

export default function DirectionLight({
  angle,
  intensity,
}: {
  angle: number;
  intensity: number;
}) {
  const lightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      const radius = 10;
      lightRef.current.position.set(
        Math.sin(angle) * radius,
        10,
        Math.cos(angle) * radius
      );
      lightRef.current.intensity = intensity;

      // lightRef.current.target.position.set(0, 0, 0); // Ensure light faces the center
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={intensity}
      position={[50, 7, 12]}
      castShadow
      shadow-radius={100}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    ></directionalLight>
  );
}
