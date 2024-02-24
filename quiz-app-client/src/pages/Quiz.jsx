import NavBar from "../components/NavBar";
import Questions from "../components/Questians";
import { useEffect, useState } from "react";
import { useGetQuestiansMutation } from "../slices/apiSlice";
import { toast } from "react-toastify";

const Quiz = () => {
  const [questians, setQuestians] = useState([]);
  const [getQuestians] = useGetQuestiansMutation();
  const [number, setNumber] = useState(1);

  const fetchData = async () => {
    try {
      const res = await getQuestians().unwrap();
      console.log(res);
      setQuestians(res);
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [number]);
  return (
    <div>
      <NavBar />
      <Questions
        number={number}
        question={questians.question}
        options={questians.options}
        callback={setNumber}
        category={questians.category}
      />
    </div>
  );
};

export default Quiz;
