import { motion } from "framer-motion";
import AnalyticsCard from "../components/AnalyticsCard";

const Dashboard = () => {

  return (
    <div className="p-8">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-8"
      >
        Dashboard
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">

        <AnalyticsCard title="Calories Burned" value="540 kcal" />
        <AnalyticsCard title="Workouts" value="5 this week" />
        <AnalyticsCard title="Steps" value="12,450" />

      </div>

    </div>
  );
};

export default Dashboard;