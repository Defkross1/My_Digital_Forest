"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function Column({ position, height, name, onProjectClick }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  return (
    <group position={position}>
      <mesh 
        ref={mesh} 
        castShadow 
        receiveShadow 
        onClick={(e) => { e.stopPropagation(); onProjectClick(name); }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <cylinderGeometry args={[0.8, 1.2, height, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#33ff33" : "#2a221a"} 
          roughness={0.8} 
        />
      </mesh>
    </group>
  );
}

export default function ForestGrid({ onProjectClick }) {
  const columns = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40],
    height: 12 + Math.random() * 8,
    name: `PROYECTO_${i + 1}`
  }));

  return (
    <group>
      {columns.map((c, i) => <Column key={i} {...c} onProjectClick={onProjectClick} />)}
    </group>
  );
}