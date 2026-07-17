"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ForestGrid from "./ForestGrid";

export default function Forest() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111111' }}>
      <Canvas shadows camera={{ position: [40, 20, 40], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[40, 20, 40]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[20, 30, 20]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
        />
        <fog attach="fog" args={['#0a0a0a', 5, 80]} />

        {/* Suelo para anclar el bosque */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        
        <ForestGrid />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} radius={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}