const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail=()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_APP_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.SENDER_MAIL,
        to: process.env.RECEIVER_MAIL,
        subject: 'Are you alive ?',
        text: 'No idea'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

module.exports={sendEmail}