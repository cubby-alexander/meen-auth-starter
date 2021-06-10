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
                res.send(req.session.currentUser);
                // res.redirect('/');
            } else {
                res.send('Oops! Invalid credentials.')
            }
        }
    })
})

// Export Sessions Router
module.exports = sessionsRouter;