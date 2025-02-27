import React from "react";
import { motion, useAnimate } from "framer-motion";

interface TypeWriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
}

 function TypeWriter({
  text,
  className = "",
  delay = 0,
  speed = 0.05,
  cursor = true
}: TypeWriterProps) {
  const [scope, ] = useAnimate();
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    let currentText = "";
    const typeText = async () => {
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      
      for (let i = 0; i <= text.length; i++) {
        currentText = text.slice(0, i);
        setDisplayText(currentText);
        await new Promise(resolve => setTimeout(resolve, speed * 1000));
      }
    };

    typeText();
  }, [text, delay, speed]);

  return (
    <span ref={scope} className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
export default TypeWriter;