const express = require("express")
const router = express.Router()

router.get('/homepage', (req, res) => {
    res.render('landingpage') 

})
router.get('/homepage/contact-us', (req, res) => {
    res.render('contact-us') 

})
router.get("/homepage/order", (req, res) => {
    res.render('order') 
})

module.exports = router