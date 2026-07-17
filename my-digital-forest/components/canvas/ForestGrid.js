"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function Column({ position, height, name }) {
  const mesh = useRef();
  const { camera } = useThree();
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      // Calculamos la distancia entre la cámara y esta columna específica
      const distance = camera.position.distanceTo(mesh.current.position);
      setActive(distance < 15);
    }
  });

  return (
    <group>
      {/* Geometría de la columna */}
      <mesh ref={mesh} position={position} castShadow receiveShadow>
        <boxGeometry args={[2, height, 2]} />
        <meshStandardMaterial 
          color="#737373" 
          emissive={active ? "#ffaa00" : "#000000"}
          emissiveIntensity={2}
          roughness={0.9} 
        />
      </mesh>
      
      {/* Interfaz HTML que aparece sobre el proyecto cuando estás cerca */}
      {active && (
        <Html 
          position={[position[0], height + 2, position[2]]} 
          center 
          distanceFactor={15}
        >
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            color: '#ffaa00',
            padding: '8px 15px',
            borderRadius: '4px',
            border: '1px solid #ffaa00',
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 10px rgba(255, 170, 0, 0.3)'
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ForestGrid() {
  // Generación consistente de 15 proyectos
  const columns = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 60, (8 + Math.random() * 12) / 2, (Math.random() - 0.5) * 60],
    height: 8 + Math.random() * 12,
    name: `PROYECTO_${i + 1}_ID`
  }));

  return (
    <group>
      {columns.map((col, index) => (
        <Column 
          key={index} 
          position={col.position} 
          height={col.height} 
          name={col.name} 
        />
      ))}
    </group>
  );
}