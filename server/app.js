const dotenv = require('dotenv');


const express = require('express');
const app = express();

dotenv.config({path: './config.env'});  // getting password from config.env
const DB = process.env.DATABASE;  //SECURITY
const PORT = process.env.PORT;

require('./db/conn');
// const User = require('./models/userSchema');

// to make app understand json files, otherwise it will show undefined
app.use(express.json());

// we link the router files to make route easy
app.use(require('./router/auth'));

// Middleware
const middleware =(req,res, next) => {
    console.log('Hello middleware, checking verification');
    next(); //it allows to move in next phase after verfying
}




// app.get('/', (req,res) => {
//     res.send('heyyyyyyyyy fro server app.js');
// })
app.get('/about',middleware, (req,res) => {
    console.log('about verified by middleware');
    res.send('about you................');
})

app.get('/contact', (req,res) => {
    res.send('contact');
})


//console.log('beeeeeeeeeees');

app.listen( PORT, () => {
    console.log(`server is running in ${PORT} `);
} )












