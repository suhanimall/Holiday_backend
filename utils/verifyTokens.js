import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//For verifying JWT Tokens
export const verifyToken = (req, res, next) => {

    //taking tokens from cookies
    const token = req.cookies.access_token;
    //if no token the we are not authenticated
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    //else verify using jwt
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};

//Verifying the user before deleting account
export const verifyUser = (req, res, next) => {
    //firstly check whether the user is authenticated or not
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Yor are not authorized!"));
        }
    });
};

//Verifying whether user is admin or not
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "You are not an admin!"));
        }
    });
};