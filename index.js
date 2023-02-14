import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// https://mongoosejs.com/docs/connections.html
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected!")
})

app.get("/", (req,res) => {
    res.send("hello first request")
})

// middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err,req,res, next) =>{

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    res.header('Access-Control-Allow-Origin', '*');
    next();
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
    
})
const PORT = process.env.PORT || 8800;
app.listen(PORT, ()=> {
    connect();
    console.log("connected to backend!");
})

// added to package.json
//  "type": "module",
// script: "start": "nodemon index.js"