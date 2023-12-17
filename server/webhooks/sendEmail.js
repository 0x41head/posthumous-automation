const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail=(receiver,subject,body)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_APP_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.SENDER_MAIL,
        to: receiver,
        subject: subject,
        text: body
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