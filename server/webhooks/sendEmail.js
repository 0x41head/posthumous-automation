const nodemailer = require('nodemailer');

const sendEmail=()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aaronbalzacthedj@gmail.com',
            pass: 'qbxh tswp xeat slpl'
        }
    });

    var mailOptions = {
        from: 'aaronbalzacthedj@gmail.com',
        to: 'aryangiroud@gmail.com',
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