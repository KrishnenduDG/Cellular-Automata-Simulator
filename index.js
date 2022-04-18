// Header Inclusions
const express=require('express');
const path=require('path');
require('dotenv').config();


// Declarations
const app=express();
const port = process.env.PORT || 8000;


app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
})



// Starting the server
app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
})