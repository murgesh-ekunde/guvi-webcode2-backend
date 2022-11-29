require ('dotenv').config();
const express = require('express')
const app = express() 
const port= process.env.PORT || 3000
const cors = require("cors")
const connection = require("./db")

//database connection
connection();

// Middlewares
app.use(express.json())
app.use(cors())


app.get('/', (req,res)=> res.send("Hello world"))
app.listen(port, ()=> console.log("Server is listning at port: 3000"));