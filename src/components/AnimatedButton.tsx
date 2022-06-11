import { motion } from "framer-motion";
import { ReactNode } from "react";

function AnimatedButton({ children }: { children: ReactNode }) {
  const animVariants = {
    hover: {
      scale: 1.1,
    },
    click: {
      scale: 0.9,
    },
  };

  return (
    <motion.div variants={animVariants} whileHover="hover" whileTap="click">
      {children}
    </motion.div>
  );
}

export default AnimatedButton;
