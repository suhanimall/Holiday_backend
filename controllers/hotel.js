import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

//Creating new hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

//Updating the hotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,                                      //update the given hotel id
            { $set: req.body },                                    //set rest of data as previous
            { new: true }                                           //to display updated changes in json
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

//deleting the hotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,                                      //delete the hotel with given hotel id
        );
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        next(err);
    }
}

//Get specific hotel
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id,                                      //find the hotel
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

//Get all hotels 
export const getHotels = async (req, res, next) => {

    //hotels on minimum and maximum price
    const { min, max, ...others } = req.query;

    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 500, $lt: max || 50000 }, }).limit(req.query.limit);

        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

//getting hotel by cities
export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",")                   //making array of cities

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })              //using mongodb method to get all hotel count in a particular city
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

//getting count by the types of hotels- such as apartments, villas,.....
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
}

//Getting room in a particular hotel
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }))
        return res.status(200).json(list);
    } catch (err) {
        next(err)
    }
};