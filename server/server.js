const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const attractionpoint = require("./routes/api/attractionpoints");
const city = require("./routes/api/city");
const route = require("./routes/api/routes");
const hotels = require("./routes/api/hotels");
const itinerarys = require("./routes/api/itinerary");
const users = require("./routes/api/users");
const app = express();


app.use(bodyParser.json({ extended: false, limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb' }));
//DB Config
const db = require("./config/keys").mongoURI;

/*
//Connect to Mongo Db local
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("MongoDb Connected");
    })
    .catch(err => {
        console.log(err);
    });
*/

mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://user1:1234@cluster0-7b0mc.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("MongoDb Connected");
    })
    .catch(err => {
        console.log(err);
    });





//Passport middleware
app.use(passport.initialize());

// //Passport Config
require('./config/passport')(passport);

app.use(cors());

/////////////
app.use("/attractionpoint", attractionpoint);
app.use("/city", city);


app.use("/route", route);
///////
// //use routes

app.use("/itinerary", itinerarys);

app.use("/users", users);

app.use("/hotel", hotels)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/fypProject'))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/fypProject', 'index.html'));
    })
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
