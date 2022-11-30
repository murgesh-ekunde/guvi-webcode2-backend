const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
require ('dotenv').config();

// Database connection
module.exports = () =>{
    selectedDb: {}

    const connectionParams= 
    {useNewUrlParser: true,
    useUnifiedTopology:true,};

    async function connect(){
        try {
            const client = new MongoClient.connect(process.env.DB, connectionParams);
            await client.connect();
            this.selectedDb = client.db('bms');
        } catch(err) {
            console.error(err);
        }}

    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database!")
    }
}

