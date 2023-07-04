import express from "express"
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyTokens.js";

const router = express.Router();

//CREATE HOTEL
router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL
router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTEL
router.get("/find/:id", getHotel);

//GET ALL HOTELS
router.get("/", getHotels);

//GET HOTELS NAMES AND CITIES
router.get("/countByCity", countByCity);

//GET COUNT OF PARTICULAR TYPE HOTEL
router.get("/countByType", countByType);

//GET HOTEL ROOMS
router.get("/room/:id", getHotelRooms);


export default router