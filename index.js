const { MongoClient } = require('mongodb');
const yourConnectionURI = "mongodb+srv://RameshAravinth:Aravinth29@cluster0.wo52n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(yourConnectionURI);
const express = require('express');
const app = new express();
const ip = require('ip');
const port = 8084;
//const localIp = ip.address()
//console.log(results);
let allData ={}
app.get("/", function(req,res) {
    getPwdDbData();
    res.send(allData);
});
app.listen(port);
// console.log(`Server running at http://${localIp}:${port}/`);
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    
};

async function getPwdDbData() {
    try {
    const doc = await client.db("PASSWORD").collection("PASSWORD").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result)
        allData.samsung = result[0].samsung;
      });
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
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        //await client.close();
    }
}

main().catch(console.error);