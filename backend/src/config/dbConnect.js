const mongoose = require('mongoose');

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
};

module.exports = connectDb;