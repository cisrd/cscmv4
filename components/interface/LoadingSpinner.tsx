"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
    </div>
  );
};

export default LoadingSpinner;
