require('dotenv').config();

// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ` MongoDB not connected`));
db.on('connected', (err) => console.log(`Connection in Mongolia`));
db.on('disconnected', (err) => console.log(`Political turmoil in Mongolia`));


// Listeners
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Meen Girls, party at port " + PORT);
})