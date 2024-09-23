const mongoose = require('mongoose')
const authSchema = mongoose.Schema
const joi = require('joi')
const joigoose = require('joigoose')(mongoose)


const joiSchema = joi.object({
    name: joi.string().min(6).max(30).required(),
    email: joi.string().email().unique().required(),
    password: joi.string().min(8).required(),
    verified: joi.boolean().default(false)
})

const authModel = new authSchema(joigoose.convert(joiSchema))

module.exports = mongoose.model("auth", authModel)