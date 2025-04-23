const express = require('express');
const userApi = require('./routes/user');
const urbainApi = require('./routes/urbain');
const interurbainApi = require('./routes/interurbain');
const reservationticketApi = require('./routes/reservationticket');
const locationbusApi = require('./routes/locationbus');
require('./config/connect');

const app = express();
app.use(express.json());

app.use('/user', userApi);
app.urbain('/urbain', userApi);
app.interurbain('/interurbain', userApi);
app.reservationticket('/reservationticket', userApi);
app.locationbus('/locationbus', userApi);



app.listen(3000,()=>{
    console.log('server work');
})