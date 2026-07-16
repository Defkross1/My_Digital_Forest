"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";

export default function ForestGrid({ analyser }) {
  const group = useRef();
  const [intensities, setIntensities] = useState(new Array(100).fill(0));

  const columns = useMemo(() => {
    const grid = [];
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        grid.push({ x, z });
      }
    }
    return grid;
  }, []);

useFrame((state, delta) => {
  if (analyser && group.current) {
    const data = analyser.getFrequencyData();
    const sensibilidad = 2.0; // Aumenta este valor para más altura, disminuye para menos
    const suavizado = 5.0;    // Velocidad de respuesta (menor = más suave)

    group.current.children.forEach((mesh, i) => {
      // Obtenemos el dato y aplicamos sensibilidad
      const rawIntensity = data[i % data.length] / 255;
      const targetScale = 0.5 + (rawIntensity * sensibilidad * 4);
      
      // Aplicamos interpolación lineal (lerp) para suavizar el movimiento
      // Esto hace que la columna "suba y baje" con inercia, muy brutalista
      mesh.scale.y += (targetScale - mesh.scale.y) * (delta * suavizado);
      
      // Actualizamos el estado para el color basado en la altura real
      // Así el color siempre coincide con la altura de la columna
      intensities[i] = mesh.scale.y / 5;
    });
    
    // Forzamos un re-render del estado para el color
    setIntensities([...intensities]);
  }
});

  return (
    <group ref={group}>
      {columns.map((col, i) => (
        <mesh key={i} position={[col.x * 2, 0, col.z * 2]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial 
            color={`rgb(${50 + intensities[i] * 150}, 50, 50)`} 
            roughness={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
}