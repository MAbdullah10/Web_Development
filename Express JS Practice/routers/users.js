//SEPARATE ROUTER ONLY FOR USERS

const express = require("express")
const router = express.Router()

router.get("/" ,(req,res) =>{
    res.send("USERS LIST")
})

router.get("/new" ,(req,res) =>{
    res.send("NEW USER")
    console.log("ON SERVER")
})

router.get("/" ,(req,res) =>{
    res.send("Create user")
})

router
 .route("/:id")
 .get((req,res)=> {
    console.log(req.user)
    res.send(`Get user with id ${req.params.id}`)
 })
 .put((req,res)=> {
    res.send(`Update user with id ${req.params.id}`)
 })  
 .delete((req,res)=> {
    res.send(`Delete user with id ${req.params.id}`)
 })

const users = [{name: "ALI"},{name: "AHMAD"}]
router.param("id", (req,res,next,id) => {
    req.user= users[id]
    next()
})
module.exports = router