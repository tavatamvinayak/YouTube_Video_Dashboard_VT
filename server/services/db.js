const mongoose = require('mongoose');
require('dotenv').config();

async function DbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube-dashboard').then(() =>{
        console.log("db connection successfull")
    })
    } catch (error) {
        console.log(error ," db connection failed")
    }
    
}
module.exports = DbConnection;