import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function AnimatedBlob() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  
  const springX2 = useSpring(mouseX, { stiffness: 30, damping: 40 });
  const springY2 = useSpring(mouseY, { stiffness: 30, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative to the center of the window
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -mt-[300px] -ml-[300px] rounded-full bg-brand-500/10 blur-[100px] mix-blend-multiply"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -mt-[250px] -ml-[250px] rounded-full bg-amber-500/10 blur-[100px] mix-blend-multiply"
        style={{
          x: springX2,
          y: springY2,
        }}
        animate={{
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
    </div>
  );
}
