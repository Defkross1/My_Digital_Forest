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
      const data = analyser.getFrequencyData();
    
     group.current.children.forEach((mesh, i) => {
        // Ajustamos el índice para obtener una muestra de datos más clara
        const intensity = data[i % data.length] / 255;
      
        // Aplicamos un suavizado (lerp) o una escala más dramática
        // La base es 0.5, y la intensidad amplifica hasta 8 veces la altura
        const targetHeight = 0.5 + intensity * 8;
        mesh.scale.y = targetHeight;
      });
    }
});

// En ForestGrid.js, cambia la posición y escala en el retorno:
return (
  <group ref={group} scale={[2, 2, 2]}> {/* Escalamos el grupo completo */}
    {columns.map((col, i) => (
      <mesh key={i} position={[col.x * 2, 0, col.z * 2]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial 
        color={analyser ? `rgb(${50 + intensity * 100}, 50, 50)` : "#444444"} 
        roughness={0.8} 
      />
    </mesh>
  ))}
  </group>
);
}