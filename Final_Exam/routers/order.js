const express = require('express');
const router = express.Router();
const card = require('../models/card');
const order = require('../models/order');

router.get('/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    // console.log("This is card id", cardId )
    const mycard = await card.findById(cardId);
    if (!mycard) {
      return res.status(404).send('Product not found');
    }
    res.render('order', { mycard });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
router.get('/place/:id',async(req, res)=>{
  try {
    const Id = req.params.id;
    const newOrder = new order({
        userid:"6655f62b57830cfafab59fb0",
        quantity:"1",
        productid:Id
    });
    await newOrder.save();
    res.redirect('/');
} catch (error) {
    res.status(500).json({ error: error.message });
}
})

module.exports = router;