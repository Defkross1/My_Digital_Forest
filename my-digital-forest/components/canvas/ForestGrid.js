"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei"; // Importamos el componente de interfaz

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
      
      {/* Interfaz HTML que aparece sobre el proyecto */}
      {active && (
        <Html position={[position[0], height + 2, position[2]]} center distanceFactor={15}>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: '#ffaa00',
            padding: '10px',
            borderRadius: '5px',
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
  const columns = Array.from({ length: 15 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 60, 5, (Math.random() - 0.5) * 60],
    height: 8 + Math.random() * 12,
    name: `PROYECTO_${i + 1}_ID` // Nombre único para cada columna
  }));

  return (
    <group>
      {columns.map((col, index) => <Column key={index} {...col} />)}
    </group>
  );
}