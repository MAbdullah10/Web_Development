const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    discountedPrice: String,
    percentageDiscount:String,
    isFeatured: {
        type: Boolean,
        default: false
        }
});
module.exports = mongoose.model('card', cardSchema);