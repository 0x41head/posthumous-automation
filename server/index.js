const express = require("express");
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const redis = require('redis');
const {sendEmail}=require('./webhooks')

const PORT = 5000; 

// Create Redis Client
const redisClient = redis.createClient({
	socket: {
		host: process.env.REDIS_URL, // Redis-server for docker; 127.0.0.1 for local
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

const populateDB=async ()=>{
    const isDatabasePopulated = await redisClient.get('last update');
    if(!isDatabasePopulated){
        console.log("Data not found!");
        const currentDateTime = new Date();
        await redisClient.set('last update', currentDateTime.toISOString());
        console.log("Data Set!");
    }
    else{
        console.log("Data found!");
    }
}

populateDB();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

// Schedule a task to run every second
cron.schedule('*/10 * * * * *', async () => {
    console.log('Running a task every second!');
    const whenWasTheDBLastUpdated = await redisClient.get('last update');
    const dbDateCovertedToDateObject= new Date(whenWasTheDBLastUpdated).getTime()
    const currentDateTime = new Date().getTime();
    
    //Conversion from milliseconds to days
    const numberOfDaysFromLastResponse = ((currentDateTime-dbDateCovertedToDateObject)/86400000).toFixed(0)

    // Damn I really died or I am potentailly stuck on a place with no internet. Probably the former
    if(numberOfDaysFromLastResponse>30){
        //sendEmail();
    }

    if(numberOfDaysFromLastResponse>7){
        sendEmail(process.env.PRIMARY_MAIL,"Are You Alive?","pLease be alive");
    }

    // sendEmail(process.env.PRIMARY_MAIL,"Are You Alive?","pLease be alive");
    //FOR DEVELOPEMENT ONLY
    console.log("DB Last Updated:",whenWasTheDBLastUpdated)
});

//ROUTES

//UPDATE DATABASE 
app.post("/update",async(req,res)=>{
    try{
        if(req.body.pass != process.env.PASSWORD_TO_PREVENT_DDOS){
            res.status(403).json("Invalid Credentials");
            throw Error("Invalid Credentials")
        };
        const currentDatetTime = new Date();
        await redisClient.set('last update', currentDatetTime.toISOString());
        res.status(201).json("DB updated");
    }catch(err){
        console.error(err.message);
        res.status(500).json("Something went wrong");
    }
})

// sendEmail();

// LISTEN ON PORT 5000
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})    