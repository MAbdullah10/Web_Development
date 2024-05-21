const express = require('express')
const app=express()
const mongoose = require("mongoose");

mongoose
    .connect ("mongodb://127.0.0.1:27017/LuxusLeather",{
       // useNewUrlParser: true,
        //useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("connected to DB")
    })
    .catch(err=>{
        console.log("error while connecting to database");
        console.log(err);
    }) 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})

app.get('/login', (req, res) => {
    res.render('login') 
})
app.get('/signup', (req, res) => {
    res.render('signup') 
})

const homepageRouter = require ('./routers/homepage')
app.use('/', homepageRouter)
