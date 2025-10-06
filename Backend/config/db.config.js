const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const ConnectToDB = async() =>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("DB Connected")

    } catch (error) {
        console.log("DB Not Connected")
    }
}

module.exports = ConnectToDB
