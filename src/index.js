const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const roomRoutes = require('./routes/room');

const app = express();
const port = process.env.PORT || 8080;

// cors
app.use(cors());

const whiteList = ['http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) === -1) callback(null,true)
        else callback(new Error('Not allowed by CORS'));
    }
}

// middleware
app.use(express.json());
app.use('/api',roomRoutes);


//routes
app.get('/', cors(corsOptions), (req, res) => {
    res.send('Welcome to my API');
})

// mongodb connect

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongodb Atlas'))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })


app.listen(port, () => console.log('server listening on port', port));