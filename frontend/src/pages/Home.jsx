import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router";

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-gray-800"
      >
        AI Powered Fitness Tracking
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-lg text-gray-600 max-w-xl"
      >
        Track activities, analyze performance, and receive personalized
        AI fitness recommendations.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link to={'/activities'}>
        <Button
          variant="contained"
          size="large"
          className="mt-10"
          >
          Start Tracking
        </Button>
            </Link>
      </motion.div>

    </div>
  );
};

export default Home;