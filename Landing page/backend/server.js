const express = require('express')
const app=express()

app.listen(4000,()=>{
    console.log('Server is running on port 4000')
})



app.get('/hello',(req,res)=>{
    res.send('Hello World')
})
