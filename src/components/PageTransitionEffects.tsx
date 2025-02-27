import React from "react";
import { motion } from "framer-motion";

interface SpeedLinesProps {
  isTransitioning: boolean;
}

const SpeedLines: React.FC<SpeedLinesProps> = ({ isTransitioning }) => {
  // Generate multiple lines with different positions and angles
  const lines = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    angle: Math.random() * 45,
    width: 50 + Math.random() * 100,
    delay: Math.random() * 0.2,
  }));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-white/20 h-px"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: line.width,
            transform: `rotate(${line.angle}deg)`,
          }}
          initial={{ 
            opacity: 0,
            x: -100,
            scaleX: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [100, 300],
            scaleX: [1, 2, 0],
          }}
          transition={{
            duration: 0.5,
            delay: line.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.1
          }}
        />
      ))}
    </motion.div>
  );
};

interface PageTransitionEffectsProps {
  children: React.ReactNode;
}

 function PageTransitionEffects({ children }: PageTransitionEffectsProps) {
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Trigger transition effects
  React.useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SpeedLines isTransitioning={isTransitioning} />
      <motion.div
        initial={{ opacity: 0, x: 100, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: -100, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
export default PageTransitionEffects;