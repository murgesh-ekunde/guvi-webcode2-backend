import express from "express";
import { deleteBooking, getBookingById, newBooking } from "../controllers/bookings-controller.js";

const bookingsRouter = express.Router();

bookingsRouter.get("/:id",getBookingById);
bookingsRouter.post("/",newBooking);
bookingsRouter.delete("/:id", deleteBooking)

export default bookingsRouter