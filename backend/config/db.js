const mongoose = require('mongoose');
const User = require('../models/User');
const Endpoint = require('../models/Endpoint');
const Event = require('../models/Event');
const Delivery = require('../models/Delivery');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        await Promise.all([User.init(), Endpoint.init(), Event.init(), Delivery.init()]);
        console.log("MongoDB Connected !");
    }
    catch(error){
        console.log("Connection Error : ", error);
    }
};

module.exports = connectDB;