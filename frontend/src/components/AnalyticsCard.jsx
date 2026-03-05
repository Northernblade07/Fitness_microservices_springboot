import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </motion.div>
  );
};

export default AnalyticsCard;