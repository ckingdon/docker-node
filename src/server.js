const express = require('express');
const { constrainedMemory } = require('process');
const app = express();

app.get('/', (req,res)=>{
    res.send("Welcome to my awesome app!");
});

app.listen(3000, function () {
    console.log("app is listening on port 3000");
});

