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

      <Canvas shadows camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]} 
      />
  <AudioPlayer url="/audio.mp3" setAnalyser={setAnalyser} />
  <ForestGrid analyser={analyser} />
  <OrbitControls enablePan={true} enableZoom={true} />
</Canvas>
    </>
  );
}