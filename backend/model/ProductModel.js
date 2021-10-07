const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 20,
    },
    imgUrl: {
        type: String,
        required: true,
        max: 100,
    },
    vendor: {
        type: String,
        required: true,
        max: 20,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    id: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    priceId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema)