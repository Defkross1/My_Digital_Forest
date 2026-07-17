"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import * as THREE from "three";
import ForestGrid from "./ForestGrid";

export default function Forest() {
  const [listener] = useState(() => (typeof window !== 'undefined' ? new THREE.AudioListener() : null));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Espera a que estemos en el navegador

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111111' }}>
<Canvas shadows camera={{ position: [40, 20, 40], fov: 45 }}>
  <OrbitControls 
    enablePan={true} 
    enableZoom={true} 
    enableRotate={true} 
    maxDistance={100} 
    minDistance={5}
  />
  <ambientLight intensity={0.2} />
  <directionalLight position={[20, 30, 20]} intensity={1} castShadow />
  
  {/* Suelo que ancla todo */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="#1a1a1a" />
  </mesh>
  
  <ForestGrid />
</Canvas>
    </div>
  );
}