// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

//
/* GET ROUTES */
//

// Home Page Route - render index.handlebars
router.get('/', (req, res) => {
    res.render('index');
});

// Contact Me Route - render contact.handlebars
router.get('/contact', (req, res) => {
    res.render('contact');
});

// About Me Route - render about.handlebars
router.get('/about', (req, res) => {
    res.render('about');
});

// Portfolio Route - render portfolio.handlebars
router.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

// Registry route - render registry.handlebars
router.get('/registry', (req, res) => {
    res.render('registry');
})

// Melissa's route -- rutrns db data then populates data into table -- render melissa.handlebars
router.get('/melissa', (req, res) => {
    Contact.find({})
        .then(dbContact => {
            const rsvpObj = {
                rsvp: dbContact
            }
            res.render('melissa', rsvpObj);
        })
        .catch(err => {
            res.json(err);
        })
});

// Directions route handles google map route -- render directions.handlebars
router.get('/directions', (req, res) => {
    res.render('directions');
});


//
/* POST ROUTES */
//

// All emails from contact.handlebars are posted here in json format then sent via nodemailer
router.post('/submit', (req, res) => {
    // create new document in collection
    Contact.create(req.body)
        .then((dbPost) => {
            // Log user post
            console.log(dbPost);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;