require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI)

db = mongoose.connection

db.on('error', (err) => console.log(`An error: ${err}`))
db.once('open', () => console.log("Database Connected"))

module.exports = db
