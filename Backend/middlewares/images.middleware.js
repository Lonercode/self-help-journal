const multer = require('multer')
const DataUri = require('datauri');
const path = require('path')
const dataUri = new DataUri();



const uploads = multer()

module.exports = uploads