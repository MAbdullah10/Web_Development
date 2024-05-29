const express = require('express')
const app=express()
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(
    session({
      key: "Mykey",
      secret: "This is the secret Key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
      },
    })
    );
 app.get('/login', (req, res) => {
        res.render('login',{}) 
    })

app.get('/signup', (req, res) => {
        res.render('signup') 
    })
const authRoutes = require('./routers/auth');
app.use('/auth', authRoutes);

const homepageRouter = require ('./routers/homepage')
app.use('/', homepageRouter)

  const contactRoutes = require('./routers/contact');

  app.use('/', contactRoutes);
  const orderRoutes = require('./routers/order');
  app.use('/order',orderRoutes)

  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
 
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/', homepageRouter);
  //app.use('/', cardRouter);

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
