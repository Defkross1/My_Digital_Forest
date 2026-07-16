"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

export default function ForestGrid({ analyser }) {
  const group = useRef();
  
  // Estructura fija: El bosque es una retícula de hormigón
  const columns = useMemo(() => {
    const grid = [];
    for (let x = -10; x <= 10; x += 3) {
      for (let z = -10; z <= 10; z += 3) {
        grid.push({ x, z, baseHeight: Math.random() * 5 + 2 });
      }
    }
    return grid;
  }, []);

  useFrame(() => {
    if (analyser && group.current) {
      const data = analyser.getFrequencyData();
      group.current.children.forEach((mesh, i) => {
        const intensity = data[i % data.length] / 255;
        // La altura se mueve con lentitud, como hormigón desplazándose
        const target = intensity * 15;
        mesh.scale.y += (target - mesh.scale.y) * 0.02; 
      });
    }
  });

  return (
    <group ref={group} position={[0, -5, 0]}>
      {columns.map((col, i) => (
        <mesh key={i} position={[col.x, col.baseHeight, col.z]} castShadow receiveShadow>
          <boxGeometry args={[2, 10, 2]} />
          <meshStandardMaterial color="#333333" roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}