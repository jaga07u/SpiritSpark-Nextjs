import { GiLotus } from "react-icons/gi";
import { motion } from "framer-motion";

const LoadingLotus = ({ isLoading }) => {
  return (
    <motion.div
      animate={{
        scale: isLoading ? [1, 3.2, 1] : 1,
        rotate: isLoading ? [0, 180, 360] : 0,
        opacity: isLoading ? [0.5, 1, 0.5] : 1,
      }}
      transition={{
        duration: 1.5,
        repeat: isLoading ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <GiLotus className="w-10 h-10 text-pink-500 drop-shadow-lg" />
    </motion.div>
  );
};

export default LoadingLotus;
