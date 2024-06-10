require('dotenv').config()
const app = require('./app')
const db = require('./db')

const port = process.env.PORT

app.listen(port, '0.0.0.0', () => console.log(`Server connected at port ${port} `))