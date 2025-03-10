import { CameraControls, Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NavigationBar from "./components/Navigation";
import HouseModel from "./components/HouseModel";
import { useRoomManagement } from "./hook/useRoom";
import Overlay from "./components/Overlay";
import { useCustomCamera } from "./hook/useCustomCamera";
import { Suspense, useState } from "react";
// import DirectionLight from "./components/DirectionLight";

function App() {
  const { currentRoom, setRoom } = useRoomManagement();
  const { cameraRef, handleExit, handleMove, handleNext } = useCustomCamera(
    currentRoom,
    setRoom
  );
  const { scene:props } = useGLTF("/models/mthouseNewProps.glb");
  const { scene, nodes } = useGLTF("/models/mthouseNew.glb");
  const navigation = nodes["Navigation"]?.children;
  // const [lightRotation, setRotation] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [propsVisible,setPropsVisible] = useState(true);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <NavigationBar
        // lightRotation={lightRotation}
        // setLightRotation={setRotation}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        visble={propsVisible}
        setVisible={setPropsVisible}
      />
      <Overlay
        next={() => handleNext(navigation, "next")}
        prev={() => handleNext(navigation, "prev")}
        room={currentRoom}
        exit={() => handleExit()}
      />
      <Canvas
        shadows
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        camera={{
          far: 10000,
          position: [0, 7, 12],
        }}
      >
        <Environment
          files={"environment/environment.hdr"}
          backgroundBlurriness={1}
          environmentIntensity={lightIntensity}
          background
        />
        <CameraControls
          ref={cameraRef}
          minPolarAngle={Math.PI / 4} // Clamps how low the camera can look
          maxPolarAngle={Math.PI / 2} // Clamps how high the camera can look
        />
        {/* <DirectionLight intensity={lightIntensity} angle={lightRotation} /> */}
        <Suspense fallback="loading">
          <HouseModel
            scene={scene}
            navigation={navigation}
            currentRoom={currentRoom}
            handleMove={handleMove}
          />
          <primitive visible={propsVisible} object={props} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
