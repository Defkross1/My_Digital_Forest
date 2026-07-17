"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function Column({ position, height }) {
  const mesh = useRef();
  const { camera } = useThree();
  const [active, setActive] = useState(false);

  useFrame(() => {
    const distance = camera.position.distanceTo(mesh.current.position);
    setActive(distance < 15);
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial 
        color="#737373" 
        emissive={active ? "#ffaa00" : "#000000"}
        emissiveIntensity={2}
        roughness={0.9} 
      />
    </mesh>
  );
}

export default function ForestGrid() {
  const columns = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 60, 5, (Math.random() - 0.5) * 60],
    height: 8 + Math.random() * 12,
  }));

  return (
    <group>
      {columns.map((col, index) => <Column key={index} {...col} />)}
    </group>
  );
}