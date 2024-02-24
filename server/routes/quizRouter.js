import { Router } from "express";
import { randomQuestians } from "../controllers/quizController.js";
import { requireAuth } from "../middlewears/authMiddlewear.js";


const quizRouter = Router();

quizRouter.use(requireAuth);
quizRouter.get('/questians',randomQuestians);


export default quizRouter;
