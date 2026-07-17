"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
// Comentamos la importación por un momento para aislar el error
// import ForestGrid from "./ForestGrid"; 

export default function Forest() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [25, 15, 25], fov: 30 }}>
          <ambientLight intensity={0.5} />
         <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
       <mesh castShadow receiveShadow>
         {/* Ajustamos la geometría: ancho 2, altura 10, profundidad 2 */}
            <boxGeometry args={[2, 10, 2]} /> 
           {/* Material estilo concreto brutalista */}
          <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
       </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}