const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
require ('dotenv').config();

// Database connection
module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};


// function connectToDB (){
//     selectedDb: {}
//     const connectionParams= 
//     {useNewUrlParser: true,
//     useUnifiedTopology:true,};

//     try {
//         const connection  = mongoose.connect(process.env.DB, connectionParams)
//         console.log("Connected to database successfully")
//         this.selectedDb = client.db('bms');
//     } catch (error) {
//         console.log(error);
//         console.log("Could not connect to database!")
//     }
// }
