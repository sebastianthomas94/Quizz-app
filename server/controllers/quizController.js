import fs from "fs";
import path from "path";
import { addQuizScoreToUser } from "../helpers/mongoHelpers.js";

const questionsFilePath = path.resolve("assets/questians.json");
const loadQuestions = () => {
  const questionsData = fs.readFileSync(questionsFilePath, "utf8");
  return JSON.parse(questionsData);
};

const randomQuestians = (req, res) => {
  try {
    console.log(
      "current questian:",
      req.session.questianNumber,
      req.query.questianNumber
    );
    console.log(req.query);
    const { questianNumber, prevAnswer, skip } = req.query;
      if(req.session.questianNumber == 10 && questianNumber == 10){
        // quiz fininshed
        console.log("quiz finished with score", req.session.score);
        addQuizScoreToUser(req.user.userId,req.session.score); // adding to mongodb
        return res
        .status(200)
        .json({ message: "Quiz fininshed", score: req.session.score });
      }

    if (req.session.questianNumber === undefined) {
      // Set the questianNumber session variable if it doesn't exist
      req.session.questianNumber = 1;
      req.session.score = 0;
    } else if (req.session.questianNumber !== parseInt(questianNumber)) {
      // Check if the questianNumber from the session matches the one from the query parameters
      req.session.questianNumber = undefined;
      req.session.score -= 10 - req.session.questianNumber;
      addQuizScoreToUser(req.user.userId,req.session.score); // adding to mongodb
      return res
        .status(401)
        .json({ message: "Unauthorized access of questions (You refreshed)" });
    }
    console.log(prevAnswer, req.session?.prevAnswer);
    if (req.session?.prevAnswer) {
      if (prevAnswer == req.session.prevAnswer) {
        // checking if the answer is right
        console.log("correct answer");
        req.session.score+=4;
      } else {
        console.log("wrong answer");
        req.session.score-=3;
      }
    }

    req.session.questianNumber++;
    // Load all questions from the JSON file
    const allQuestions = loadQuestions();

    // Select a random question
    const randomQuestion =
      allQuestions[Math.floor(Math.random() * allQuestions.length)];
    req.session.prevAnswer = randomQuestion.answer;
    // Send the random question to the client
    console.log(req.session.prevAnswer, randomQuestion.answer);
    res.json(randomQuestion);
  } catch (error) {
    console.log("error happend in quiz controller:",error?.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { randomQuestians };
