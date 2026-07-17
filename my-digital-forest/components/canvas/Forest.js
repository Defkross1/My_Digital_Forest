"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import ForestGrid from "./ForestGrid";

export default function Forest() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 40 }}>
        <Environment preset="forest" />
        <fog attach="fog" args={["#050505", 5, 50]} />
        <ForestGrid onProjectClick={setSelected} />
        <OrbitControls />
      </Canvas>

      {/* Ventana Digital de Proyectos */}
      {selected && (
        <div style={{
          position: 'absolute', top: '20%', left: '30%', width: '40%', 
          background: 'rgba(0, 20, 0, 0.9)', border: '2px solid #0f0',
          color: '#0f0', padding: '20px', fontFamily: 'monospace'
        }}>
          <h2>{selected}</h2>
          <p>Conectado al repositorio de GitHub...</p>
          <a href={`https://github.com/tu-usuario/${selected}`} target="_blank" style={{ color: '#fff' }}>
            [Ver en GitHub]
          </a>
          <button onClick={() => setSelected(null)} style={{ display: 'block', marginTop: '20px' }}>CERRAR</button>
        </div>
      )}
    </div>
  );
}