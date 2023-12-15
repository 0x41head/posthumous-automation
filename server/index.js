const express = require("express");
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const redis = require('redis');

const PORT = 5000; 

// Create Redis Client
const redisClient = redis.createClient({
	socket: {
		host: "127.0.0.1", // Redis-server for docker; 127.0.0.1 for local
		port: 6379,
	},

});

// Connect to Redis client
redisClient.connect();

try {
	redisClient.on('connect', () => {
		console.log('Redis client Connected Successfully');
	});
} catch (err) {
	console.error(err.message);
}

const retryFunction=(functionToRetry)=>{
    var retry = 10;
    while(retry){
        try { 
            functionToRetry();
            break;
        }
        catch (err) {
            if (retry>0){
                retry=retry-1;
                console.log(retry+ " retries left")
            }
            else{
                console.log(err.message)
            }
        }
    }

};

//MIDDLEWARE
app.use(cors());
app.use(express.json());

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
// // Schedule a task to run every second
// cron.schedule('* * * * *', () => {
//     console.log('Running a task every second!');
//     // Add your task logic here
//   });

//ROUTES

//READ ALL TABLE ROWS AND FOMRAT AS GEOJSON
app.post("/read",async(req,res)=>{
    try{
        if(req.body != "value"){
            throw Error("Invalid Credentials")
        };
        res.status(201).json("NewData");
    }catch(err){
        console.error(err.message);
    }
})

// sendEmail();

// LISTEN ON PORT 5000
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})    