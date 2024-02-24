import React from "react";
import { useNavigate } from "react-router-dom";

const TakeTest = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/quiz');
    }
  return (
    <div className="flex justify-center m-10">
      <button className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-full shadow-lg animate-pulse transition-all duration-300 transform hover:scale-110 hover:bg-red-500 hover:text-black"
      onClick={handleClick}>
        Take Quiz
      </button>
    </div>
  );
};

export default TakeTest;
