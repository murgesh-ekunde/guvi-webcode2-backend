const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
require ('dotenv').config();

// Database connection
module.exports = () =>{
    selectedDb: {}
    async function connect(){
        try {
            const client = await MongoClient.connect(process.env.DB);
            this.selectedDb = client.db('bms');
        } catch(err) {
            console.error(err);
        }}
    
    const connectionParams= 
    {useNewUrlParser: true,
    useUnifiedTopology:true,};
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database!")
    }
}

