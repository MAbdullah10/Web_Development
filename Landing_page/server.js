const express = require('express')
const app=express()

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
