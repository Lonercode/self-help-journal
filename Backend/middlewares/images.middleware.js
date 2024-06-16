require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }                                                              
}); 



const uploads = multer({ storage: storage })

module.exports = uploads