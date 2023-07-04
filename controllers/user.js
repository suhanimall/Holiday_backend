import User from "../models/User.js";

//Updating the user
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

//deleting the user
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        next(err);
    }
}

//Get specific user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

//Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}