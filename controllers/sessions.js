const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');

// New (login page)


// Delete (logout route)


// Create (login route)
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, (error, foundUser) => {
        if (!foundUser) {
            res.send('Opps! No user with that email address has been found')
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.send('Oops! Invalid credentials.')
            }
        }
    })
})

sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser,
    });
})

sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})

// Export Sessions Router
module.exports = sessionsRouter;