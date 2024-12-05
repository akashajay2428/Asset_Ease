const express = require('express');
const app = new express();
const cors = require('cors');
app.use(cors());
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config()
require('./db/connection')




const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute)


app.listen(4000, () => {
    console.log("server is up on port 4000");
})