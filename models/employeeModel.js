const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    mobile : {
        type : Number,
        required : true
    },

    image : {
        type : String
    },

    password : {
        type : String,
        required : true
    },

    cpassword : {
        type : String,
        required : true
    },

    is_admin : {
        type : Number,
        required : true
    },

    is_varified : {
        type : Number,
        default : 0
    },

    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = new mongoose.model("employee", employeeModel);