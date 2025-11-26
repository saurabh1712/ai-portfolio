"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function NeuralBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: "#050505" } },
        fpsLimit: 60, // Optimized for performance
        particles: {
          color: { value: "#00f3ff" },
          links: { color: "#bd00ff", distance: 150, enable: true, opacity: 0.2, width: 1 },
          move: { enable: true, speed: 0.5 },
          number: { density: { enable: true, height: 800, width: 800 }, value: 60 },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
}