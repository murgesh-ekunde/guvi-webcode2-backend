import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user-routes";
dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use("/user", userRouter);

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ude2aji.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>{
        app.listen(5000, ()=>{
            console.log(`Connected to Database and Server is running`);
        })
    }).catch((e)=>
        console.log(e)
    )

