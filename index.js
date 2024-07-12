const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

//middleware
app.use(express.json());
app.use(cors());


//start server
app.get('/', (req, res)=>{
    res.send("Virtual Vault server is Running");
})

app.listen(port, ()=>{
    console.log(`Virtual vault server is running at port no ${port}`);
})