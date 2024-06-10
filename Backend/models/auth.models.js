const mongoose = require('mongoose')
const authSchema = mongoose.Schema
const Joi = require('joi')


const authModel = new authSchema({


    name:{
        type: String,
        unique: true,
        required: true,
        maxlength: 30,
        minLength: 6
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minLength: 8
    },
    
    verified: {
        type: Boolean,
        default: false
    }

})


module.exports = mongoose.model("auth", authModel)