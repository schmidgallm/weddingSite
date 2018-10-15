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
            // NODEMAILER
            const output = `
            <p>you have a new message</p>
            </h3>contact details</h3>
            <ul>
                <li>name: ${req.body.name}</li>
                <li>email: ${req.body.email}</li>
            </ul>
            <h3>message:</h3>
            </p>${req.body.message}</p>`;

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.GMAIL_EMAIL, // generated ethereal user
                    pass: process.env.GMAIL_PASS // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: `"${req.body.name}" <${req.body.email}>`, // sender address
                to: process.env.GMAIL_RECEIVER, // list of receivers
                subject: 'New Wedding RSVP', // Subject line
                text: 'Contact Info Below', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
            
            res.send(200);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;