import React, { useRef, useState, useEffect } from "react";
import {
  Canvas,
  useThree,
  extend,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const pathToCar = "/ObjectFiles/test.glb";
const pathToCarWithMirrors = "/ObjectFiles/testWithMirrors.glb";

const Controls = ({ initialView, stopSpinning, isSpinning }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (initialView) {
      camera.position.set(6, 0, 0);
      camera.lookAt(0, 0, 0);
      controlsRef.current?.update();
    }
  }, [initialView, camera]);

  useEffect(() => {
    const controls = controlsRef.current;
    const onStart = () => {
      stopSpinning(); // Stop spinning when user interacts
    };

    controls.addEventListener("start", onStart);

    // Clean up the event listener on unmount
    return () => controls.removeEventListener("start", onStart);
  }, [stopSpinning]);

  useFrame(({ clock }) => {
    if (isSpinning) {
      // Check if it's spinning
      const time = clock.getElapsedTime() / 2.5;
      camera.position.x = 7 * Math.sin(time); // Match the initial x-coordinate
      camera.position.y = 2; // Match the initial y-coordinate
      camera.position.z = 7 * Math.cos(time); // Match the initial z-coordinate
      camera.lookAt(0, 0, 0);
      controlsRef.current?.update();
    }
  });

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};

const Model = ({ withMirrors }) => {
  const ref = useRef();
  const carWithoutMirrors = useLoader(GLTFLoader, pathToCar);
  const carWithMirrors = useLoader(GLTFLoader, pathToCarWithMirrors);

  const obj = withMirrors ? carWithMirrors.scene : carWithoutMirrors.scene;

  obj.scale.set(2, 2, 2);

  const box = new Box3().setFromObject(obj);
  const center = box.getCenter(new Vector3());
  obj.position.sub(center);

  return <primitive object={obj} ref={ref} />;
};

export default function ThreedTest({ partOn }) {
  const [withMirrors, setWithMirrors] = useState(partOn);
  const [initialView, setInitialView] = useState(true);
  const [isSpinning, setIsSpinning] = useState(true); // New state to manage spinning

  // Function to stop spinning
  const stopSpinning = () => {
    setIsSpinning(false);
  };

  return (
    <div className="tdm-container">
      <Canvas
        camera={{ position: initialView ? [5, 0, 0] : [0, 0, 5] }}
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: "80%",
        //   height: "80%",
        // }}
      >
        <Controls
          initialView={initialView}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
        />
        <ambientLight intensity={2} />
        <Model withMirrors={partOn} />
      </Canvas>
    </div>
  );
}
