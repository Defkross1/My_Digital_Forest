"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import ForestGrid from "./ForestGrid";

export default function Forest() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111111' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[30, 20, 30]} fov={45} />
        <OrbitControls enablePan={true} enableZoom={true} />
        
        {/* Iluminación estilo cinematográfico brutalista */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <fog attach="fog" args={['#111111', 10, 60]} />

        {/* El Bosque que acabamos de programar */}
        <ForestGrid />
      </Canvas>
    </div>
  );
}