import React from 'react'
import ActivityForm from '../components/ActivityForm'
import ActivityList from '../components/ActivityList'

const Activity = () => {
  const handleAdded = () => {
    window.location.reload(); 
  };

  return (
    <div className="container mx-auto">
      <ActivityForm onActivityAdded={handleAdded} />
      <ActivityList />
    </div>
  );
};

export default Activity