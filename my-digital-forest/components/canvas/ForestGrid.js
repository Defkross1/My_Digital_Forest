"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

export default function ForestGrid({ analyser }) {
  const group = useRef();

  const columns = useMemo(() => {
    const grid = [];
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        grid.push({ x, z });
      }
    }
    return grid;
  }, []);

  useFrame(() => {
    if (analyser && group.current) {
      // Obtenemos los datos de frecuencia del audio
      const data = analyser.getFrequencyData();
      
      group.current.children.forEach((mesh, i) => {
        // Usamos el dato de frecuencia para escalar la altura (valor entre 0 y 255)
        // Mapeamos el dato para que sea una escala suave (ej: 0.1 a 5)
        const intensity = data[i % data.length] / 255;
        mesh.scale.y = 0.5 + intensity * 5;
      });
    }
  });

// En ForestGrid.js, cambia la posición y escala en el retorno:
return (
  <group ref={group} scale={[2, 2, 2]}> {/* Escalamos el grupo completo */}
    {columns.map((col, i) => (
      <mesh key={i} position={[col.x * 2, 0, col.z * 2]}>
        <boxGeometry args={[0.8, 1, 0.8]} /> {/* Columnas más anchas */}
        <meshStandardMaterial color="#444444" />
      </mesh>
    ))}
  </group>
);
}