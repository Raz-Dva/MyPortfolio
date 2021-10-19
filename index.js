const express = require('express');
const app = express();
require("dotenv").config()
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
            // user: "honcharov.ivan.1987@gmail.com",
            // pass: "ygDf7BVtgK5C"
        }
    });
    var message =
        `Author:  ${req.body.name}
Mail:  ${req.body.email}
Phone: ${req.body.phone}
${req.body.message}`

    const messageOptions = {
        from: 'honcharov.ivan.1987@gmail.com',
        // from: req.body.email,
        subject: "My Portfolio",
        text: message,
        to: "honcharov.ivan.1987@gmail.com"
    };
    transporter.sendMail(messageOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Your message has not been sent! ')
        }
        // console.log(info);
        res.send('Your message was sent successfully!');
    });
})


app.get('/download_cvpl', function (req, res) {
    const file = `${__dirname}/assets/pdf/CV-front-end-dev-Honczarow.pdf`;
    res.download(file);
});

app.get('/download_cvru', function (req, res) {
    const file = `${__dirname}/assets/pdf/CV-front-end-dev-Goncharov.pdf`;
    res.download(file);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));