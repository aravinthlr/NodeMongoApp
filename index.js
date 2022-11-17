const { MongoClient } = require('mongodb');
const yourConnectionURI = "mongodb+srv://RameshAravinth:Aravinth29@cluster0.wo52n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(yourConnectionURI);
const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = new express();
const ip = require('ip');
const port = 8084;
const localIp = ip.address();
const verify = require('./verify');

dotenv.config({ path: 'config.env' });
app.use(bodyParser.json());
app.post("/user/generateToken", async (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    
  const { userName, password } = req.body;
  const usersInfo = await client.db("AUTHENTICATION").collection("USERS").findOne();
  if(usersInfo.users.find(user => user.userName === userName && user.password === password)) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
  }
  else res.status(401).send('Invalid Credentials')
});
app.get("/copyData", function(req,res) {
    getCopyData(req, res);
});

async function getCopyData(req,res) {
    try {
    if(!verify(req,jwt)) res.status(401).send('UNAUTHORISED ACCESS');
    const response = await client.db("PASSWORD").collection("PASSWORD").findOne();
    console.log({response});
    res.send(response);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        //await client.close();
    }
   // console.log(doc);
}

async function main(){
  
 
    try {
        
        await client.connect();
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}

main().catch(console.error);

// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in the header of the request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
  
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });

app.listen(port);
 console.log(`Server running at http://${localIp}:${port}/`);