import fs from "fs";
import path from "path";

const questionsFilePath = path.resolve("assets/questians.json");
const loadQuestions = () => {
    const questionsData = fs.readFileSync(questionsFilePath, "utf8");
    return JSON.parse(questionsData);
  };

const randomQuestians = (req, res) => {
  try {
    // Load all questions from the JSON file
    const allQuestions = loadQuestions();

    // Shuffle the array of questions
    // const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    // Select the first 10 questions
    const randomQuestions = allQuestions[Math.floor(Math.random()*allQuestions.length)];

    // Send the random questions to the client
    res.json(randomQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { randomQuestians };
