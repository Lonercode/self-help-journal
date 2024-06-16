require('dotenv').config()
const Entry = require('../models/entry.models')
const user = require('../models/auth.models')
const DataUri = require('datauri');
const path = require('path')
const dataUri = new DataUri();
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_KEY
  });



const getEntries = async(req, res, next) => {
    try{
    const entries = await Entry.find({
        user: req.user
    })
    res.status(200).json({message: entries})
}
catch(err){
    res.status(500).json({message: err.message})
}

}

const getEntry = async(req, res, next) => {
    try{
        const entry = await Entry.findOne({_id: req.query._id, user: req.user})
        
        res.status(200).json({message: entry, id: entry._id})
        
    
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const createEntry = async(req, res, next) => {
    try{
        const image = req.files
        console.log(image)
        image = dataUri.format(path.extname(image.originalname).toString(), image.buffer).content;
        const result = await cloudinary.uploader.upload(image)
        const entry = await Entry.create({
        image: await result.secure_url,
        title: req.body.title,
        content: req.body.content,
        user: req.user
    })
    res.status(201).json({message: "Entry created successfully :)"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const updateEntry = async(req, res, next) => {
    try{
    const entry = await Entry.findOne({_id: req.query._id, user: req.user})
    const image = req.file
    image = dataUri.format(path.extname(image.originalname).toString(), image.buffer).content;
    const result = cloudinary.uploader.upload(image)
    if (entry){
    await Entry.findOneAndUpdate(
        {_id: req.query._id},
        {$set: 
        {image: await result.secure_url,
        title: req.body.title,
        content: req.body.content
        },
    },
    {new: true},
        )

        await entry.save()
        res.status(200).json({message: "Edit successful :)"})
}

    
    else{
        res.status(401).json({message: "Unauthorized"})
    }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}



const deleteEntry = async(req, res, next) => {
    try{
    const user = await Entry.findOne({user: req.user})
    const entry = await Entry.findOne({_id: req.query._id, user: req.user})
    if (user){
    await Entry.findOneAndDelete(
        entry
    )
        
        res.status(200).json({message: "Delete successful :)", id: entry._id})
    }
    else{
        res.status(401).json({message: "Unauthorized"})
    }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}


module.exports = {
    getEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry
}