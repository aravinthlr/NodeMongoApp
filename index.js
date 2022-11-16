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

dotenv.config({ path: 'config.env' });
//console.log(results);
console.log(process.env);
let allData ={}
app.use(bodyParser.json());
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    
  const { userName, password } = req.body;
  if(userName !== "Aravinth" || password !== "Aravinth") throw error;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});
app.get("/copyData", function(req,res) {
    getCopyData(res);
});
app.listen(port);
 console.log(`Server running at http://${localIp}:${port}/`);
async function getCopyData(res) {
    try {
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
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}

main().catch(console.error);

app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});