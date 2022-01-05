const mongoose = require('mongoose'); // npm i mongoose
const express = require('express'); // npm i express
const app = express(); // run express
const Users = require('./models/user.js'); // the data
const port = process.env.PORT || 3001 || 3000 // port for our website

mongoose.connect('Your Mongodb link'); // your mongo data link


// this is if you write http://localhost:3001/ then it will display the mongodb datas when u open
// mongodb then you will see the datas right this is that
// you can also run http://localhost:3001/?user=<Here the User id>
app.get('/', (req, res) => {
    const user = req.query.user;

    // if you want see all the data and not http://localhost:3001/?user=<Here the User id>
    if (!user) {
        Users.find({}, (err, data) => res.send(data))
        return;
    }

    // this for when u do this http://localhost:3001/?user=<Here the User id> to find a user
    Users.findOne({ userID: user }, (err, data) => {
        if (!data) return res.send('no id found');
        res.send(data) // send the data to http://localhost:3001/
    });
})

app.listen(port, function(err) { // run the website
    if (err) return console.log(err)
    console.log(`Listening at http://localhost:${port}/`)
})