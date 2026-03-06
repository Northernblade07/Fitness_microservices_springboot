import React from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import AnimatedBackground from "../components/AnimatedBackground";

const Activity = () => {

  const handleAdded = () => {
    window.location.reload();
  };

  return (

    <div className="relative min-h-screen flex flex-col items-center px-4 py-12 mt-15">

      <AnimatedBackground />

      <div className="w-full max-w-5xl space-y-12">

        <ActivityForm onActivityAdded={handleAdded} />

        <ActivityList />

      </div>

    </div>

  );
};

export default Activity;