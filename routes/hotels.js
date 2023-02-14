import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotelController.js';
import { createError } from '../utils/error.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
//router.post("/", verifyAdmin, createHotel)
router.post("/", createHotel)
//UpDATE
router.put("/:id", updateHotel)
//DELETE
router.delete("/:id", deleteHotel)
//GET
router.get("/find/:id", getHotel)
//GETALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

router.get("/room/:id", getHotelRooms)


export default router