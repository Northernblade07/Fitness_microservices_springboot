import React, { useEffect, useState } from "react";

const ActivityList = ({ refresh }) => {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const fetchActivities = async () => {

      // Replace with API call
      setActivities([
        { id: 1, type: "RUNNING", duration: 30, calories: 200 },
        { id: 2, type: "CYCLING", duration: 45, calories: 350 }
      ]);

    };

    fetchActivities();

  }, [refresh]);

  return (

    <div className="max-w-3xl mx-auto">

      <h2 className="text-xl font-semibold mb-4">
        Activity History
      </h2>

      <div className="space-y-4">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="p-4 bg-white rounded-lg shadow"
          >
            <p className="font-medium">{activity.type}</p>
            <p>Duration: {activity.duration} min</p>
            <p>Calories: {activity.calories}</p>
          </div>

        ))}

      </div>

    </div>

  );
};

export default ActivityList;