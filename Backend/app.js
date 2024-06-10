const express = require('express')
const app = express()
const journalRoutes = require('./routes/all.routes')
const cors = require('cors')
const multer = require('multer')
const path = require('path')


const corsOrigin ={
    origin:'http://localhost:5173', 
    credentials:true,            
    optionSuccessStatus:200,
    methods: ["POST", 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
}

app.use('/uploads', express.static('uploads'))

app.use(express.json())
app.use(cors(corsOrigin))

app.use("/otu-heart", journalRoutes)


module.exports = app