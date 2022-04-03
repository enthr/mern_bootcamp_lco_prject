require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// My Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentBRoutes = require('./routes/paymentB');

//Express Connection
const app = express();


//DB Connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`DB CONNECTED`);
}).catch(() => {
    console.log(`DB ERROR`);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentBRoutes);

//Port
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
    console.log(`App is Running At ${port}`);
});