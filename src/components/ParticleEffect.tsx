import React from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleEffectProps {
  active?: boolean;
  color?: string;
  particleCount?: number;
}

function ParticleEffect({
  active = false,
  color = "rgba(236, 72, 153, 0.3)", // Couleur rose par défaut
  particleCount = 10,
}: ParticleEffectProps) {
  // Générer un tableau de particules typé
  const particles: Particle[] = React.useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: 2 + Math.random() * 4,
        duration: 0.6 + Math.random() * 0.4,
        delay: Math.random() * 0.2,
      })),
    [particleCount]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {active &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: particle.size,
              height: particle.size,
              left: "50%",
              top: "50%",
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              x: particle.x,
              y: particle.y,
              opacity: [1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
    </div>
  );
}

export default ParticleEffect;
