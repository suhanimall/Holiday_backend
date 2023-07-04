import User from "../models/User.js";
import bcrypt from "bcryptjs";                  //library of mongoose for encoding the password
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";                 //JWT Token for checking admin

//Creating a user
export const register = async (req, res, next) => {
    try {
        //Encoding the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //creating the user
        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("User has been created")
    } catch (err) {
        next(err);
    }
}

//Login function
export const login = async (req, res, next) => {
    try {
        //checking for the user in database
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not Found!"));

        //if user exist then checking the password with the encrypted password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        //Checking if the user is an admin using JWT token
        //Sending data to JWT to verify the user along with a secret key
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        //to prevent from displaying password and other details to others
        const { password, isAdmin, ...otherDetails } = user._doc;               //_doc path contains these things
        res.cookie("access_token", token, {
            httpOnly: true,                     //does not allow any other user to reach the cookie
        })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};

//Jsonwebtoken- JWT Token used to share information between two entites in securely manner, send webtoken in cookie