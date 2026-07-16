"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Forest() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f0f0f0" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        
        {/* Tu columna brutalista */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 5, 1]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}