import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";



dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`)});
const app = express();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.error(err.message));
app.use(express.json({ limit: "200mb" }));
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
        origin: "*",
        methods: "*",
        credentials: true,
    })
);

app.use("/user",userRouter);

app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`)
    console.log(`${process.env.SERVER} server started` )
}
);