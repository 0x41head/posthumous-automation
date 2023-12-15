const express = require("express");
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const PORT = 5000; 

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

// Schedule a task to run every second
cron.schedule('* * * * *', () => {
    console.log('Running a task every second!');
    // Add your task logic here
  });

//ROUTES

//READ ALL TABLE ROWS AND FOMRAT AS GEOJSON
app.post("/read",async(req,res)=>{
    try{
        console.log(req.body);
        res.status(201).json("NewData");
    }catch(err){
        console.error(err.message);
    }
})


// LISTEN ON PORT 5000
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})    