import User from "../models/User.js"
import bcrypt from "bcryptjs"

// getting all user information
export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return console.log(err)
    }

    if(!users){
        return res.status(500).json({message:"Unexpected error occured!"})
    }

    return res.status(200).json({users});
}

// Creating user and checking invalidations
export const signup = async(req, res, next)=>{
    const { name, email , password} = req.body;
    if(!name && 
        name.trim()=== "" &&
        !email &&
        email.trim()=== "" &&
        !password &&
        password.trim()=== ""
    ){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({name, email, password:hashedPassword});
        user = await user.save();
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message:"Unexpected error occured!"})
    }
    return res.status(201).json({user});
}

// Controller function to update user
export const updateUser = async (req, res, next)=> {
    const id = req.params.id;

    const { name, email , password} = req.body;
    if(!name && 
        name.trim()=== "" &&
        !email &&
        email.trim()=== "" &&
        !password &&
        password.trim()=== ""
    ){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id, {name, email, password:hashedPassword})
    } catch (error) {
        return console.log(error)
    }

    if(!user){
        return res.status(500).json({message:"Something went wrong!"})
    }
    return res.status(200).json({message:"Updated Successfully"});
}

// Controller function to delete user
export const deleteUser = async (req,res,next) => {
    const id = req.params.id;
    let user ;

    try {
        user = await User.findByIdAndRemove(id);
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong!"})
    }
    return res.status(200).json({message:"Deleted Successfully"});
} 

// Controller function for login user
export const login = async (req,res,next) =>{
    const { email , password} = req.body;
    if( !email &&
        email.trim()=== "" &&
        !password &&
        password.trim()=== ""
    ){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser){
        return res.status(404).json({message:"User not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }

    return res.status(200).json({message:"Login Successfully"})
}
