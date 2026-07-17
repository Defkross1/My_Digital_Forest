"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function Column({ position, height, name }) {
  const mesh = useRef();
  const { camera } = useThree();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    // Calculamos distancia para activar la "Resonancia Narrativa"
    const distance = camera.position.distanceTo(mesh.current.position);
    if (distance < 10 && !isHovered) {
      setIsHovered(true);
      // Aquí dispararemos el audio 8D en la siguiente fase
      console.log(`Activando narrativa para: ${name}`);
    } else if (distance >= 10 && isHovered) {
      setIsHovered(false);
    }
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={isHovered ? "#ffaa00" : "#333333"} roughness={0.9} />
    </mesh>
  );
}

export default function ForestGrid() {
  const columns = [
    { position: [10, 5, 10], height: 10, name: "Proyecto 1" },
    { position: [-10, 7, -10], height: 14, name: "Proyecto 2" },
    // Añade más columnas según necesites
  ];

  return (
    <group>
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </group>
  );
}