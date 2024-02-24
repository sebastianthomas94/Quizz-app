import NavBar from "../components/NavBar";
import Questions from "../components/Questians";
import { useEffect, useState } from "react";
import { useGetQuestiansMutation } from "../slices/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../components/ScoreCard";

const Quiz = () => {
  const [questians, setQuestians] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [getQuestians] = useGetQuestiansMutation();
  const [number, setNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFininshed] = useState(false);
  const [skip, setSkip] = useState(false);
  const navigate = useNavigate();
  const [score, setScore] = useState();

  const fetchData = async () => {
    try {
      const res = await getQuestians({
        questianNumber: number,
        prevAnswer: selectedAnswer,
        skip: skip,
      }).unwrap();
      setSkip(false);
      if (res?.score) {
        //if the quiz is finished and the score is published
        setScore(res.score);
        setFininshed(true);
        return setTimeout(()=>{
          navigate('/home');
        }, 3000);
      }
      setQuestians(res);
      setLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      //   console.log(error);
      toast.error(error?.data?.message);
      setLoading(false); // Set loading state to false on error
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchData();
  }, [number]);

  return (
    <div>
      <NavBar />
     {!finished ? <>
        {" "}
        {loading ? ( // Conditional rendering based on loading state
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Questions
            number={number}
            question={questians.question}
            options={questians.options}
            callback={setNumber}
            answerCallback={setSelectedAnswer}
            category={questians.category}
            skipCallback = {setSkip}
          />
        )}
      </>:<ScoreCard score={score}/>}
    </div>
  );
};

export default Quiz;
