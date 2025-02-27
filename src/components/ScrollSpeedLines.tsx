import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface SpeedLine {
  id: number;
  x: number;
  width: number;
  opacity: number;
}

 function ScrollSpeedLines() {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Generate random lines
  const [lines] = React.useState<SpeedLine[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      width: 20 + Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.2
    }))
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        opacity: smoothY.get() > 100 ? Math.min(scrollY.get() / 1000, 0.5) : 0
      }}
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-gradient-to-r from-pink-500/20 to-blue-500/20 h-px"
          style={{
            left: `${line.x}%`,
            width: line.width,
            opacity: line.opacity,
            transform: `translateY(${smoothY.get() * 0.5}px) rotate(-45deg)`
          }}
        />
      ))}
    </motion.div>
  );
}
export default ScrollSpeedLines;