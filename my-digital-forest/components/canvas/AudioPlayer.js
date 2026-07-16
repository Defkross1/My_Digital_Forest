"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function AudioPlayer({ url, setAnalyser }) {
  const { camera } = useThree();
  const listener = useRef(new THREE.AudioListener());
  const sound = useRef(null);

  useEffect(() => {
    camera.add(listener.current);
    
    // Inicializamos el sonido
    sound.current = new THREE.Audio(listener.current);
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(url, (buffer) => {
      sound.current.setBuffer(buffer);
      sound.current.setLoop(true);
      // Creamos el analizador con una FFT size más grande para mayor detalle (64 o 128)
      const analyser = new THREE.AudioAnalyser(sound.current, 64);
      setAnalyser(analyser);
    });

    return () => {
      camera.remove(listener.current);
      if (sound.current) sound.current.disconnect();
    };
  }, [url, camera, setAnalyser]);

  // Esta es la parte crítica para el audio en navegadores modernos
  window.startAudio = async () => {
    const context = listener.current.context;
    if (context.state === 'suspended') {
      await context.resume();
    }
    if (sound.current && !sound.current.isPlaying) {
      sound.current.play();
      console.log("Audio iniciado correctamente");
    }
  };

  return null;
}