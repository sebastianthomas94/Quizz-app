import { useNavigate } from "react-router-dom";
import cookieCheck from "../helpers/cookieCheck.js";
import { useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import TakeTest from "../components/TakeTest.jsx";
import PreviousQuizCard from "../components/PreviousQuizCard.jsx";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.info("Home page");
    if (!cookieCheck()) navigate("/login");
  });

  return (
    <div className="">
      <NavBar />
      <TakeTest/>
      <PreviousQuizCard/>
    </div>
  );
};

export default Home;
