import express from "express";                       //dependency for express
import dotenv from "dotenv";                          //dependency for mongo
import mongoose from "mongoose";                       //dependency for mongoose
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParse from "cookie-parser";            //importing cookie as middleware
import cors from "cors"                             //import cors as middleware

const app = express()                                //calling express function
dotenv.config()                                        //contains the configuration of mongo

//Intial connection to mongodb using mongoose
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);               //pass the secret key to connect
        console.log("Connected to mongodb")
    } catch (error) {
        throw error;
    }
};

//when mongodb is disconnected in between 
mongoose.connection.on("disconnected", () => {
    console.log("Mongodb Disconnected")
})

//when mongodb is connected in between
mongoose.connection.on("connected", () => {
    console.log("Mongodb Connected")
})

//middlewares- request reaches to middleware before response
app.use(cors())
app.use(cookieParse())

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Api is Running...");
});

app.use((err, req, res, next) => {                  //error handling middleware
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

//connecting to server
app.listen(8800, () => {
    connect()
    console.log("Connected to backend!!")
});
