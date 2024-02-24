import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import quizRouter from "./routes/quizRouter.js";
import session from "express-session";
import dataRouter from "./routes/dataRouter.js";



dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`)});
const app = express();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.error(err.message));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
app.use(
    express.urlencoded({
        limit: "200mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "*",
        credentials: true,
    })
);

app.use("/user",userRouter);
app.use("/quiz",quizRouter);
app.use('/data', dataRouter);

app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`)
    console.log(`${process.env.SERVER} server started` )
}
);