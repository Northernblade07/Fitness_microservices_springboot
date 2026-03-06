import { motion } from "framer-motion";
import AnalyticsCard from "../components/AnalyticsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { getActivity } from "../services/api";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#f43f5e", "#14b8a6"];

const Dashboard = () => {

  const [activities, setActivities] = useState([]);

  const [weeklyCalories, setWeeklyCalories] = useState([]);
  const [activityDistribution, setActivityDistribution] = useState([]);

  const [totalCalories, setTotalCalories] = useState(0);

  const fetchActivities = async () => {

    try {

      const res = await getActivity();
      const data = res.data;

      console.log(res)
      setActivities(data);

      processAnalytics(data);

    } catch (err) {

      console.error("Failed to fetch activities", err);

    }

  };

  const processAnalytics = (data) => {

    let caloriesSum = 0;

    const weekdayMap = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    const activityTypeMap = {};

    data.forEach((activity) => {

      caloriesSum += activity.caloriesBurned || 0;

      const day = new Date(activity.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });

      weekdayMap[day] += activity.caloriesBurned || 0;

      if (!activityTypeMap[activity.type]) {
        activityTypeMap[activity.type] = 0;
      }

      activityTypeMap[activity.type]++;

    });

    const weeklyData = Object.keys(weekdayMap).map((day) => ({
      day,
      calories: weekdayMap[day],
    }));

    const typeDistribution = Object.keys(activityTypeMap).map((type) => ({
      name: type,
      value: activityTypeMap[type],
    }));

    setWeeklyCalories(weeklyData);
    setActivityDistribution(typeDistribution);
    setTotalCalories(caloriesSum);

  };

  useEffect(() => {
    async function getActivities() {
      fetchActivities();
    }
    getActivities()
  }, []);

  return (

    <div className="p-8 max-w-6xl mx-auto">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-10  text-transparent bg-clip-text"
      >
        Fitness Dashboard
      </motion.h2>

      {/* Analytics Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <AnalyticsCard
          title="Calories Burned"
          value={`${totalCalories} kcal`}
        />

        <AnalyticsCard
          title="Total Workouts"
          value={activities.length}
        />

        <AnalyticsCard
          title="Activity Types"
          value={activityDistribution.length}
        />

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Weekly Calories */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >

          <h3 className="font-semibold mb-4">
            Weekly Calories Burned
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={weeklyCalories}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="calories"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* Activity Type Distribution */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >

          <h3 className="font-semibold mb-4">
            Activity Distribution
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={activityDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >

                {activityDistribution.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

    </div>

  );

};

export default Dashboard;