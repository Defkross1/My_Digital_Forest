"use client";

import { Canvas } from "@react-three/fiber";
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

      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <AudioPlayer url="/audio.mp3" setAnalyser={setAnalyser} />
        <ForestGrid analyser={analyser} />
      </Canvas>
    </>
  );
}