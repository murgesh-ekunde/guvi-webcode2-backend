import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]; //Beareer token
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  // console.log(extractedToken)
  let adminId;
  // Token verification

  Jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  // Create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      actors,
      featured,
      posterUrl,
      admin: adminId,
    });

    const session = await mongoose.startSession();
    const adminUser =  await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction();


  } catch (error) {
    return console.log(error);
  }

  if(!movie){
    return res.status(500).json({message:"Request failed"})
  }

  return res.status(201).json({movie})
};


export const getAllMovies = async (req,res,next) => {
    let movies;
     try {
        movies = await Movie.find();
     } catch (error) {
        console.log(error)
     }

     if(!movies){
        return res.status(500).json({message:"Request failed"});
     }
     return res.status(200).json({movies})
}

export const getMovieById = async(req, res, next) =>{
    const id= req.params.id;
    let movie;

    try {
        movie = await Movie.findById(id)
    } catch (error) {
        console.log(error)
    }

    if(!movie){
        return res.status(404).json({message:"Invalid Movie ID"})
    }
    return res.status(200).json({movie});
}