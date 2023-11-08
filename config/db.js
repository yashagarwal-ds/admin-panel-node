const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/usermanagement").then(() => {
        console.log("Connection Succesfull")
    }).catch((error) => {
        console.log(error)
    })
};

module.exports = connectDB;