import "./App.css";
import { CameraControls, Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NavigationBar from "./components/Navigation";
import HouseModel from "./components/HouseModel";
import { useRoomManagement } from "./hook/useRoom";
import Overlay from "./components/Overlay";
import { useCustomCamera } from "./hook/useCustomCamera";
import { Suspense, useState } from "react";
import DirectionLight from "./components/DirectionLight";

function App() {
  const { currentRoom, setRoom } = useRoomManagement();
  const { cameraRef, handleExit, handleMove } = useCustomCamera(setRoom);
  const { scene, nodes } = useGLTF("/models/sample2.glb");
  const navigation = nodes["Navigation"]?.children;
  const [lightRotation, setRotation] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0.5);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <NavigationBar
        lightRotation={lightRotation}
        setLightRotation={setRotation}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
      />
      <Overlay room={currentRoom} exit={() => handleExit()} />
      <Canvas
        shadows
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        camera={{
          far: 10000,
          position: [-20, 5, 30],
        }}
      >
        <Environment
          files={"environment/environment.hdr"}
          backgroundBlurriness={1}
          environmentIntensity={lightIntensity}
          background
        />
        <CameraControls ref={cameraRef} />
        <DirectionLight intensity={lightIntensity} angle={lightRotation} />
        <Suspense fallback="loading">
          <HouseModel
            scene={scene}
            navigation={navigation}
            currentRoom={currentRoom}
            handleMove={handleMove}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
