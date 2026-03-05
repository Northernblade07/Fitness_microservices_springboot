import { Avatar } from "@mui/material";
import { motion } from "framer-motion";

const Profile = () => {

  return (
    <div className="p-8 max-w-md mx-auto text-center mt-20">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >

        <Avatar
          sx={{ width: 100, height: 100 }}
          className="mx-auto"
        />

      </motion.div>

      <h2 className="text-2xl font-bold mt-4">
        John Doe
      </h2>

      <p className="text-gray-500">
        Fitness Enthusiast
      </p>

    </div>
  );
};

export default Profile;