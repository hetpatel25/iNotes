const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL  = process.env.MONGO_URI;

const connectToMongo  = ()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log("connected to mongo successfully");
    });
} 

module.exports = connectToMongo;