const mongoose = require('mongoose')
const entrySchema = mongoose.Schema
const auth = require('../models/auth.models')


const entryModel = new entrySchema({

    imagePublicUrl: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: true
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

module.exports = mongoose.model('entry', entryModel)