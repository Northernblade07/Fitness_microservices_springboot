import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  getActivityDetail,
  getActivityrecommendations,
} from "../services/api";

const ActivityDetails = () => {

  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const fetchActivityDetail = async () => {
    try {
      const res = await getActivityDetail(id);
      setActivity(res.data);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const fetchActivityRecommendation = async () => {
    setLoadingRecommendation(true);

    try {
      const res = await getActivityrecommendations(id);
      setRecommendation(res.data);
    } catch (error) {
      console.error("Failed to fetch recommendation:", error);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  if (loadingActivity) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading activity...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="p-8 mt-20 text-red-500">
        Activity not found
      </div>
    );
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-24 p-6"
    >

      <h2 className="text-3xl font-bold mb-10  text-transparent bg-clip-text">
        Activity Analysis
      </h2>

      {/* Activity Card */}

      <div className="backdrop-blur-lg bg-white/70 border border-gray-200 rounded-2xl shadow-xl p-6 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">Activity</span>
          <span className="font-semibold">{activity.type}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-semibold">{activity.duration} minutes</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Calories</span>
          <span className="font-semibold">{activity.caloriesBurned}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Created</span>
          <span className="font-semibold">
            {new Date(activity.createdAt).toLocaleString()}
          </span>
        </div>

      </div>

      {/* Button */}

      <button
        onClick={fetchActivityRecommendation}
        className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition"
      >
        Generate AI Recommendation
      </button>

      {loadingRecommendation && (
        <p className="mt-4 text-gray-500">
          AI is analyzing your activity...
        </p>
      )}

      {/* Recommendation Section */}

      {recommendation && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 space-y-6"
        >

          {/* AI Analysis */}

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">
              AI Analysis
            </h3>

            <p className="text-gray-700 whitespace-pre-line">
              {recommendation.Recommendation}
            </p>
          </div>

          {/* Suggestions */}

          {recommendation.suggestions?.length > 0 && (

            <div className="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm">

              <h3 className="font-semibold mb-3">
                Suggestions
              </h3>

              <ul className="list-disc pl-5 space-y-1 text-gray-700">

                {recommendation.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}

              </ul>

            </div>

          )}

          {/* Improvements */}

          {recommendation.improvements?.length > 0 && (

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 shadow-sm">

              <h3 className="font-semibold mb-3">
                Improvements
              </h3>

              <ul className="list-disc pl-5 space-y-1 text-gray-700">

                {recommendation.improvements.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}

              </ul>

            </div>

          )}

          {/* Safety */}

          {recommendation.safety?.length > 0 && (

            <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm">

              <h3 className="font-semibold mb-3">
                Safety Tips
              </h3>

              <ul className="list-disc pl-5 space-y-1 text-gray-700">

                {recommendation.safety.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}

              </ul>

            </div>

          )}

        </motion.div>

      )}

    </motion.div>

  );

};

export default ActivityDetails;