const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./utils/db')
require('dotenv').config();


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get('/home',(req, res)=> {
//     return res.send({message:"hello"})
// })



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));


// api
app.use('/api/user', require('./routes/user'));
app.use('/api/company', require('./routes/company'));
app.use('/api/job', require('./routes/job'));
app.use('/api/application', require('./routes/application'));


const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`server is listeing on ${PORT}`)
})