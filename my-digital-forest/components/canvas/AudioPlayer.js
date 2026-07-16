"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function AudioPlayer({ url, setAnalyser }) {
  const { camera } = useThree();
  const listener = useRef(new THREE.AudioListener());
  const sound = useRef(null);

  useEffect(() => {
    // Añadimos el listener a la cámara
    camera.add(listener.current);
    
    // Creamos el nodo de sonido
    sound.current = new THREE.Audio(listener.current);
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, (buffer) => {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      // Creamos el analizador
      const analyser = new THREE.AudioAnalyser(sound.current, 32);
      setAnalyser(analyser); // Pasamos el analizador hacia arriba
    });

    return () => {
      camera.remove(listener.current);
    };
  }, [url, camera, setAnalyser]);

  // Función para arrancar el audio desde el componente padre
  window.startAudio = () => {
    if (sound.current && !sound.current.isPlaying) {
      sound.current.play();
    }
  };

  return null;
}