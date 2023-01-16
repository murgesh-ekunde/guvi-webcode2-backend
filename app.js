import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-auth-token, Origin, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, content-type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie",movieRouter);
app.use("/booking", bookingsRouter)

app.get("/", async function(request,response){
    response.send("Hi, Welcome to Capstone...!!!")
})

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ude2aji.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>{
        app.listen(5000, ()=>{
            console.log(`Connected to Database and Server is running`);
        })
    }).catch((e)=>
        console.log(e)
    )

