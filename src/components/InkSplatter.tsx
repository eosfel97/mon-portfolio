import React from "react";
import { motion } from "framer-motion";

interface Splatter {
  id: number;
  scale: number;
  rotate: number;
  x: number;
  y: number;
  opacity: number;
}

interface InkSplatterProps {
  active?: boolean;
  color?: string;
  scale?: number;
}

 function InkSplatter({ 
  active = false, 
  color = "rgba(236, 72, 153, 0.15)",
  scale = 1
}: InkSplatterProps) {
  // Generate random splatter shapes
  const [splatters] = React.useState<Splatter[]>(
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      scale: 0.5 + Math.random() * 0.5,
      rotate: Math.random() * 360,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      opacity: 0.5 + Math.random() * 0.5
    }))
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={false}
      animate={active ? "active" : "inactive"}
    >
      {splatters.map((splatter) => (
        <motion.div
          key={splatter.id}
          className="absolute left-1/2 top-1/2"
          variants={{
            inactive: { 
              scale: 0,
              opacity: 0,
              x: 0,
              y: 0
            },
            active: {
              scale: splatter.scale * scale,
              opacity: splatter.opacity,
              x: splatter.x,
              y: splatter.y,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              transform: `rotate(${splatter.rotate}deg)`,
              fill: color
            }}
          >
            <path d="M50 0C55 25 75 50 50 75C25 100 0 75 25 50C50 25 45 0 50 0Z" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
export default InkSplatter;