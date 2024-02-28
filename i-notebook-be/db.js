const mongoose  = require("mongoose");
const mongoUri = 'mongodb://localhost:27017/'

const connectWithMongo = async() => {
    await mongoose.connect(mongoUri)
    console.log('connected to Mongo DB');
}

module.exports = connectWithMongo;