"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // <--- ESTO ES LO QUE FALTA
import { useState } from "react";
import ForestGrid from "./ForestGrid";
import AudioPlayer from "./AudioPlayer";

export default function Forest() {

  const [analyser, setAnalyser] = useState(null);

  return (
    <>
      <button 
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}
        onClick={() => window.startAudio()}
      >
        INICIAR BOSQUE SONORO
      </button>

<Canvas shadows camera={{ position: [25, 15, 25], fov: 30 }}>
  <color attach="background" args={["#111111"]} />
  <fog attach="fog" args={["#111111", 5, 60]} />
  
  <ambientLight intensity={0.05} />
  <directionalLight position={[0, 20, 0]} intensity={2} castShadow />
  
  <ForestGrid analyser={analyser} />
  <OrbitControls maxPolarAngle={Math.PI / 2 - 0.1} />
</Canvas>
    </>
  );
}