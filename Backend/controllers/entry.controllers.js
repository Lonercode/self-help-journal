require('dotenv').config()
const Entry = require('../models/entry.models')
const user = require('../models/auth.models')

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_KEY
  });



const getEntries = async(req, res, next) => {
    try{
    const page = req.query.page || 1
    const limit = 5

    const entries = await Entry.find({
        user: req.user
    }).skip((page - 1) * limit).limit(limit)
    const totalEntries = await Entry.countDocuments({user: req.user})

    res.status(200).json({
        message: entries,
        totalPages: Math.ceil(totalEntries/limit),
        totalEntries
    })
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
        const image = req.file
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'uploads'
        });

        const entry = await Entry.create({
        imagePublicUrl: result.public_id,
        image: result.secure_url,
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

const updateEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findOne({ _id: req.query._id, user: req.user });

        if (!entry) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let updateFields = {
            title: req.body.title,
            content: req.body.content
        };

        if (req.file) {
            if (entry.imagePublicUrl) {
                await cloudinary.uploader.destroy(entry.image);
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads'
            });

            updateFields.image = result.secure_url;
            updateFields.imagePublicUrl = result.public_id;
        }

        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: req.query._id, user: req.user },
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json({ message: "Edit successful :)", entry: updatedEntry });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



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