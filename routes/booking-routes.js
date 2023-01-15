import express from "express";
import { deleteBooking, getBookingById, newBooking } from "../controllers/bookings-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.post("/:id",getBookingById);
bookingsRouter.get("/",newBooking);
bookingsRouter.delete("/:id", deleteBooking)

export default bookingsRouter