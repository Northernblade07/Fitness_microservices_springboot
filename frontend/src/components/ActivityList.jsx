import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getActivity } from "../services/api";
import { motion } from "framer-motion";
import { Card, CardContent } from "@mui/material";
import { FaFire, FaClock, FaRunning } from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const ActivityList = ({ refresh }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await getActivity();
      setActivities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [refresh]);

  return (
    <div className="max-w-4xl mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-6 text-gray-100 underline">
        <SectionHeader title="Activity History :-" />
      </h2>

      <motion.div
        className="grid md:grid-cols-2 gap-5 "
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >

        {activities.map((activity) => (

          <motion.div
            key={activity.id}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-3xl"
          >

            <Link to={activity.id}>

<Card className="glass-card rounded-2xl transition-all hover:scale-[1.03] hover:shadow-2xl">  
                <CardContent className="space-y-3">

                  <div className="flex items-center gap-2 text-lg font-semibold text-indigo-600">
                    <FaRunning />
                    {activity.type}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock />
                    Duration: {activity.duration} min
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaFire />
                    Calories: {activity.calories}
                  </div>

                  <p className="text-sm text-gray-400">
                    Start Time: {activity.startTime}
                  </p>

                </CardContent>

              </Card>

            </Link>

          </motion.div>

        ))}

      </motion.div>
    </div>
  );
};

export default ActivityList;