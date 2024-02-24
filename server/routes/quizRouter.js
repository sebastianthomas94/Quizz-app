import { Router } from "express";
import User from "../models/userModel.js";
import { randomQuestians } from "../controllers/quizController.js";


const quizRouter = Router();

quizRouter.get('/questians',randomQuestians);


export default quizRouter;
