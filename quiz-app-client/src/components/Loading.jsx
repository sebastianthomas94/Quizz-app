import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/quiz");
    }, 5000);
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 text-lg font-semibold">
        Your quiz is getting prepared...
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Don't refresh, fullscreen mode (F11) advised
      </div>
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
