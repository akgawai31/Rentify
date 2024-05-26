const mongoose = require('mongoose')
require('dotenv').config();
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology:true
})


const db = mongoose.connection;

db.on('connected', () => {
    console.log("Database connection is Established")
})

db.on('error', () => {
    console.log("connection eroor")
})
db.on('disconnected', () => {
    console.log("Database disconnected")
})


module.exports = db;