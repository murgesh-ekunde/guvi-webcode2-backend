require ('dotenv').config();
const express = require('express')
const app = express() 
const port= process.env.PORT || 3000
const cors = require("cors")
const connection = require("./db");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

//database connection
connection();

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.get('/', (req,res)=> res.send("Hello world"))
app.listen(port, ()=> console.log("Server is listning at port: 3000"));