import { useNavigate } from "react-router-dom";
import cookieCheck from "../helpers/cookieCheck.js";
import { useEffect } from "react";
import NavBar from "../components/NavBar.jsx";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.info("Home page");
    if (!cookieCheck()) navigate("/login");
  });

  return (
    <div className="lex h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
