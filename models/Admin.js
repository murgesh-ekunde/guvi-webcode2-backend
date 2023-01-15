import mongoose from "mongoose";

const adminSchema  = new mongoose.Schema({
    email:{
        type: String,
        required :true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLenght: 6,
    },
    addedMovies: [{
        type: mongoose.Types.ObjectId,
        ref:"Movie",
    }]
});

export default mongoose.model("Admin", adminSchema);