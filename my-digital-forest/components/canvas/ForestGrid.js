"use client";

import { useMemo } from "react";

export default function ForestGrid() {
  // Generamos una matriz de columnas (ej. 10x10)
  const columns = useMemo(() => {
    const grid = [];
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        grid.push({ x, z, height: Math.random() * 4 + 1 });
      }
    }
    return grid;
  }, []);

  return (
    <>
      {columns.map((col, i) => (
        <mesh key={i} position={[col.x * 2, col.height / 2, col.z * 2]}>
          <boxGeometry args={[1, col.height, 1]} />
          <meshStandardMaterial color="#555555" roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}