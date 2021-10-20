const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
    requestFrom: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    requestTo: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    exchangeInItems: {
        type: Array,
    },
    exchangeOutItems: {
        type: Array,
    },
    messages: {
        type: Array,
    },
    status: {
        type: String,
        required: true,
        min: 15,
        max: 30,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exchange', exchangeSchema)