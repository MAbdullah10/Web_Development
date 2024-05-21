const express = require("express")
const router = express.Router()
const Card = require('../models/card')

router.get('/', async (req, res) => {
    try{
        const cards  = await Card.find();
        const categorizedCards = cards.reduce((acc, card) => {
            (acc[card.category] = acc[card.category] || []).push(card);
            return acc;
         }, {});
        res.render('landingpage',{categorizedCards})
    } 
    catch(err){
        console.error('Error fetching products:', err);
        res.status(500).json({message: err.message});
    }
})


router.get('/contact-us', (req, res) => {
    res.render('contact-us') 
})
router.get("/order", (req, res) => {
    res.render('order') 
})

module.exports = router

