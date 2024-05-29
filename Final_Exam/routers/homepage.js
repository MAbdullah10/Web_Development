const express = require("express")
const router = express.Router()
const Card = require('../models/card')
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        
        // Separate the featured products
        const featuredCards = cards.filter(card => card.isFeatured);
        
        // Categorize the remaining products
        const categorizedCards = cards.reduce((acc, card) => {
            if (!card.isFeatured) {
                (acc[card.category] = acc[card.category] || []).push(card);
            }
            return acc;
        }, {});
        
        res.render('landingpage', { categorizedCards, featuredCards });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/contact-us', (req, res) => {
    res.render('contact-us');
});

router.get("/order", (req, res) => {
    res.render('order');
});

router.get('/contact-us', (req, res) => {
    res.render('contact-us') 
})
router.get("/order", (req, res) => {
    res.render('order') 
 })
 router.get('/order/place/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).send('Product not found');
        }

        // Store the visited product ID in the session
        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }
        if (!req.session.visitedProducts.includes(card._id.toString())) {
            req.session.visitedProducts.push(card._id.toString());
        }

        res.render('product', { card });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: err.message });
    }
});

// Route for displaying visited products
router.get('/visited-products', async (req, res) => {
    try {
        const visitedProducts = req.session.visitedProducts || [];
        const cards = await Card.find({ '_id': { $in: visitedProducts } });
        res.render('visited-products', { cards });
    } catch (err) {
        console.error('Error fetching visited products:', err);
        res.status(500).json({ message: err.message });
    }
});

// router.get('/products/:id', async (req, res) => {
//     try {
//         const card = await Card.findById(req.params.id);
//         if (!card) {
//             return res.status(404).send('Product not found');
//         }
//         res.render('product', { card });
//     } catch (err) {
//         console.error('Error fetching product:', err);
//         res.status(500).json({ message: err.message });
//     }
// });
module.exports = router

