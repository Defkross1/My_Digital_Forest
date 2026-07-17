"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function Column({ position, height, name }) {
  const mesh = useRef();
  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial color="#737373" roughness={0.9} />
    </mesh>
  );
}

export default function ForestGrid() {
  // Generamos 15 columnas de forma estática pero distribuida
  const columns = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 60, 5, (Math.random() - 0.5) * 60],
    height: 8 + Math.random() * 12,
    name: `Proyecto ${i + 1}`
  }));

  return (
    <group>
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </group>
  );
}