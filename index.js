const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());


//mongodb setup

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mfte2wh.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const productsCollection = client.db("virtualVault").collection("products");


    app.get('/allFeaturedProducts', async(req, res)=>{
        const query = {
            featured: "yes"
        }
        const result = await productsCollection.find(query).toArray();

        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



//start server
app.get('/', (req, res)=>{
    res.send("Virtual Vault server is Running");
})

app.listen(port, ()=>{
    console.log(`Virtual vault server is running at port no ${port}`);
})