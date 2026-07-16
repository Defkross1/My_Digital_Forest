"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ForestGrid from "./ForestGrid"; // Importamos nuestro sistema

export default function Forest() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f0f0f0" }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* Aquí está nuestro bosque */}
        <ForestGrid />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}