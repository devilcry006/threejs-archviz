import "./App.css";
import { CameraControls, Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NavigationBar from "./components/Navigation";
import HouseModel from "./components/HouseModel";
import { useRoomManagment } from "./hook/useRoom";
import Overlay from "./components/Overlay";
import { useCustomCamera } from "./hook/useCustomCamera";
import { Suspense } from "react";

function App() {
  const { currentRoom, setRoom } = useRoomManagment();
  const { cameraRef, handleExit, handleMove } = useCustomCamera(setRoom);
  const { scene, nodes } = useGLTF("/models/sample2.glb");
  const navigation = nodes["Navigation"]?.children;

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <NavigationBar />
      <Overlay room={currentRoom} exit={() => handleExit()} />
      <Canvas
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        camera={{
          far: 10000,
          position: [-20, 5, 30],
        }}
      >
        <CameraControls ref={cameraRef} />
        <directionalLight />
        <Environment
          preset="park"
          backgroundIntensity={0.2}
          backgroundBlurriness={1}
          background
        />
        <Suspense fallback="loading">
          <HouseModel
            scene={scene}
            navigation={navigation}
            cameraRef={cameraRef}
            currentRoom={currentRoom}
            handleMove={handleMove}
          />
        </Suspense>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </div>
  );
}

export default App;
