"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ForestGrid({ analyser }) {
  const group = useRef();

  // Generamos un bosque de 20 columnas brutalistas
  const columns = Array.from({ length: 20 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 40, 5, (Math.random() - 0.5) * 40],
    height: 5 + Math.random() * 10,
  }));

  return (
    <group ref={group}>
      {columns.map((col, index) => (
        <mesh key={index} position={col.position} castShadow receiveShadow>
          <boxGeometry args={[2, col.height, 2]} />
          <meshStandardMaterial color="#333333" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}