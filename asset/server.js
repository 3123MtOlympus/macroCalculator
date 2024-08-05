const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const app = express();

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'contact_storage'
});

connection.connect();

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-email-password'   // Your email password or app password
    }
});

// Set up Twilio client
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'); // Replace with your Twilio credentials

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const emailOrCell = req.body.emailOrCell;
    const isPhoneNumber = /^\d{10}$/.test(emailOrCell); // Simple check for phone number
    const results = req.body.results; // Assuming results are sent with the form

    if (isPhoneNumber) {
        // Send SMS
        twilioClient.messages.create({
            body: `Your results are: ${results}`,
            from: 'YOUR_TWILIO_PHONE_NUMBER',
            to: emailOrCell
        }).then(message => {
            console.log(`SMS sent: ${message.sid}`);
            res.send('SMS sent with results.');
        }).catch(error => {
            console.error('Error sending SMS:', error);
            res.status(500).send('Error sending SMS.');
        });
    } else {
        // Send Email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: emailOrCell,
            subject: 'Your Results',
            text: `Your results are: ${results}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email.');
            } else {
                console.log('Email sent:', info.response);
                res.send('Email sent with results.');
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
