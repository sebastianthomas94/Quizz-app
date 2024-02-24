import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate("/login");
    };
  
    const handleRegister = () => {
      navigate("/register");
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App!</h1>
          <p className="text-lg mb-6">
            This is a quiz app where you can test your knowledge with 10 questions in each quiz.
          </p>
          <p className="text-lg mb-6">You earn 4 points for a correct answer and 3 points for a wrong answer.</p>
          <p className="text-lg mb-6">Compete with others and see your rank on the leaderboard!</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
};

export default Welcome;
