const mongoose = require('mongoose');

function connectDB() {

    mongoose.connect(process.env.Mongo_Url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", function() {
        console.log("Connected to MongoDB database successfully!");
    });
}

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL)
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

module.exports = connectDB;



