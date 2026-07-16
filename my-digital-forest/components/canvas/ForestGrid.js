"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

export default function ForestGrid() {
  const group = useRef();
  
  // Definimos la cuadrícula una vez
  const columns = useMemo(() => {
    const grid = [];
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        grid.push({ x, z, baseHeight: Math.random() * 3 + 1 });
      }
    }
    return grid;
  }, []);

  // useFrame nos permite animar en cada fotograma
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.children.forEach((mesh, i) => {
      // Aquí más adelante conectaremos el audio
      // Por ahora, una animación suave para probar reactividad
      const scale = Math.sin(time + i) * 0.5 + 1;
      mesh.scale.y = scale;
    });
  });

  return (
    <group ref={group}>
      {columns.map((col, i) => (
        <mesh key={i} position={[col.x * 2, 0, col.z * 2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
}