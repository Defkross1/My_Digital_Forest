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

  useFrame(() => {
    if (analyser && group.current) {
      const data = analyser.getFrequencyData();
      const newIntensities = columns.map((_, i) => data[i % data.length] / 255);
      setIntensities(newIntensities);

      group.current.children.forEach((mesh, i) => {
        mesh.scale.y = 0.5 + newIntensities[i] * 5;
      });
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