import { Router } from "express";
import { requireAuth } from "../middlewears/authMiddlewear.js";
import { getAllPreviousQuizzesByUser, getRank, getLeaderboard } from "../controllers/dataController.js";

const dataRouter = Router();

dataRouter.use(requireAuth);
dataRouter.get('/prevquiz',getAllPreviousQuizzesByUser);
dataRouter.get('/rank', getRank);
dataRouter.get('/leaderboard',getLeaderboard);


export default dataRouter;
