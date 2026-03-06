import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

    </div>
  );
};

export default AnimatedBackground;