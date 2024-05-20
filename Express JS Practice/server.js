const express = require('express')
const app = express()

app.set('view engine' , 'ejs')
/*
//first route
app.get("/" ,(req,res)=>{
    console.log("on server")
    res.send("on browser")
})
// passing json on browser
app.get("/" ,(req,res)=>{
    console.log("on server")
    res.json({message: "error"})
})
app.get("/home" ,(req,res)=>{
    console.log("on server")
    res.json({message: "error"})
})
//download file from browser
app.get("/download" ,(req,res)=>{
    console.log("on server")
    res.download("server.js")
})
//rendering html on browser
app.get("/html" ,(req,res)=>{
    res.render("index", {text: "Coming from server"})
})*/
//Calling a router
const userRouter = require ('./routers/users')
app.use('/users', userRouter)

app.listen(3000)
