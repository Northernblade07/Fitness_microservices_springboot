import { motion } from "framer-motion";

const SectionHeader = ({ title }) => {
  return (
    <motion.h2
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      className="text-3xl font-bold text-white mb-6"
    >
      {title}
    </motion.h2>
  );
};

export default SectionHeader;