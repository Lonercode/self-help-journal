const mongoose = require('mongoose')
const updateentrySchema = mongoose.Schema
const auth = require('../models/auth.models')


const updateentryModel = new updateentrySchema({

    imagePublicUrl: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: false
    },

    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'auth',
   },
   date: {
    type: Date,
    default: Date.now()
   }
   
}, {timestamps: true}
)

module.exports = mongoose.model('updateentry', updateentryModel)