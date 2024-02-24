import React, { useState } from "react";
import { toast } from "react-toastify";

const Questions = ({
  number,
  question,
  options,
  callback,
  category,
  answerCallback,
  skipCallback,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if(!selectedOption){
      return toast.dark("You have to select an answer!")
    }
    callback((prevCount) => prevCount + 1);
    answerCallback(selectedOption);
  };

  // const handleSkip = ()=>{
  //   skipCallback(true);
  //   callback((prevCount) => prevCount + 1);
  //   answerCallback("");
  // }

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md my-10">
      <h2 className="text-lg font-bold mb-4">{`Question ${number}`}</h2>
      <h2 className="font-bold mb-2">Category: {category}</h2>
      <p className="text-lg mb-6">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`block w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
              selectedOption === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-200"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {/* <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleSkip}>
          Skip
        </button> */}
      </div>
    </div>
  );
};

export default Questions;
