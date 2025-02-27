import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

 function LoadingIndicator({ 
  size = "medium",
  color = "currentColor" 
}: LoadingIndicatorProps) {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  const circleVariants = {
    hidden: { pathLength: 0, rotate: 0 },
    visible: { 
      pathLength: 1,
      rotate: 360,
      transition: {
        pathLength: { duration: 1.5, repeat: Infinity },
        rotate: { duration: 1.5, repeat: Infinity, ease: "linear" }
      }
    }
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} animate-spin`}
      viewBox="0 0 24 24"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        fill="none"
        variants={circleVariants}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeOpacity="0.2"
      />
    </motion.svg>
  );
}
export default LoadingIndicator;