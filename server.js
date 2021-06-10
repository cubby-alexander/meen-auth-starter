require('dotenv').config();

// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

// Middleware
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ` MongoDB not connected`));
db.on('connected', () => console.log(`Connection in Mongolia`));
db.on('disconnected', () => console.log(`Political turmoil in Mongolia`));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// Body parser middleware
app.use(express.urlencoded({ extended: true}));

// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController)

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

// Listeners
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Meen Girls, party at port " + PORT);
})