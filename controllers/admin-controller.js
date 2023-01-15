import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

export const addAdmin = async (req,res,next) => {
    const { email, password } = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email});
    } catch (error) {
        return console.log(error)
    }

    if(existingAdmin){
        return res.status(400).json({message:"Admin already exist"});
    }

    let admin;
    const hashedPassword = bcrypt.hashSync(password);

    try {
        admin = new Admin ({email, password:hashedPassword});
        admin =  await admin.save()

    } catch (error) {
        return console.log(error)
    }

    if(!admin){
        return res.status(500).json({message:"Unable to find admin"})
    }
    return res.status(201).json({admin});
}

export const adminLogin = async(req, res, next) =>{
    const { email , password} = req.body;
    if(!email &&
        email.trim()=== "" &&
        !password &&
        password.trim()=== ""
    ){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email})
    } catch (error) {
        return console.log(error)
    }

    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect){
        return res.status(400).json({message:"Invalid password"});
    }

    const token = Jwt.sign({id: existingAdmin._id}, process.env.SECRET_KEY,{expiresIn: "1d"});

    return res.status(200).json({message:"Authentication complete", token, id:existingAdmin._id})
}

export const getAdmins = async(req,res,next) =>{
    let admins;
    try {
        admins = await Admin.find();
    } catch (error) {
        return console.log(error)
    }

    if(!admins){
        return res.status(500).json({message:"Internal sever error"})
    }
    return res.status(200).json({admins})
}
