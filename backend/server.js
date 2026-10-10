require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const endpointRoutes = require('./routes/endpointRoutes');
const eventRoutes = require('./routes/eventRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use('/api/auth', authRoutes);
app.use('/api/endpoints', endpointRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/deliveries', deliveryRoutes);

app.listen(3000, () => {
    console.log("Server has started");
});