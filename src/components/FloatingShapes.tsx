import React from "react";
import { motion } from "framer-motion";

interface Shape {
  id: number;
  type: "circle" | "square" | "triangle";
  size: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

 function FloatingShapes() {
  // Generate random shapes
  const [shapes] = React.useState<Shape[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as Shape["type"],
      size: 20 + Math.random() * 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      color: [
        "rgba(236, 72, 153, 0.1)", // pink
        "rgba(96, 165, 250, 0.1)", // blue
        "rgba(168, 85, 247, 0.1)", // purple
      ][Math.floor(Math.random() * 3)],
      delay: Math.random() * 5
    }))
  );

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            className="rounded-full"
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
            }}
          />
        );
      case "square":
        return (
          <motion.div
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              borderRadius: "4px",
            }}
          />
        );
      case "triangle":
        return (
          <motion.div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
          animate={{
            y: ["-20px", "20px", "-20px"],
            rotate: [shape.rotation - 10, shape.rotation + 10, shape.rotation - 10],
          }}
          transition={{
            duration: 5,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  );
}
export default FloatingShapes;