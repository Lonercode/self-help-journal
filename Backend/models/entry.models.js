const mongoose = require('mongoose')
const entrySchema = mongoose.Schema
const auth = require('../models/auth.models')
const joi = require('joi')
const joigoose = require('joigoose')

const joiSchema = joi.object({
    imagePublicUrl: joi.string().uri().optional(),
    image: joi.string().required(),
    title: joi.string().required().unique(),
    content: joi.string().required(),
    user: joi.string().required(),
    date: joi.date().default(Date.now())
})

const entryModel = new entrySchema(joigoose.convert(joiSchema), {timestamps: true})

entryModel.path('user').ref('auth')

module.exports = mongoose.model('entry', entryModel)