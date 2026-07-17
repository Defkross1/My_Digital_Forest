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
      const distance = camera.position.distanceTo(mesh.current.position);
      setActive(distance < 15);
    }
  });

  return (
    <group>
      <mesh ref={mesh} position={position} castShadow receiveShadow>
        <boxGeometry args={[2, height, 2]} />
        <meshStandardMaterial 
          color="#737373" 
          emissive={active ? "#ffaa00" : "#000000"}
          emissiveIntensity={2}
          roughness={0.9} 
        />
      </mesh>
      
      {active && (
        <Html position={[position[0], height + 2, position[2]]} center distanceFactor={15}>
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            color: '#ffaa00',
            padding: '8px 15px',
            borderRadius: '4px',
            border: '1px solid #ffaa00',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ForestGrid() {
  // Creamos una rejilla de 4x4 (16 posiciones) para asegurar espacio entre ellas
  const columns = [];
  const spacing = 15; // Distancia mínima entre columnas

  for (let x = 0; x < 4; x++) {
    for (let z = 0; z < 4; z++) {
      columns.push({
        position: [
          (x - 2) * spacing + (Math.random() - 0.5) * 5, // x con pequeño jitter
          (8 + Math.random() * 12) / 2,                  // y ajustado
          (z - 2) * spacing + (Math.random() - 0.5) * 5  // z con pequeño jitter
        ],
        height: 8 + Math.random() * 12,
        name: `PROYECTO_${x * 4 + z + 1}_ID`
      });
    }
  }

  return (
    <group>
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </group>
  );
}