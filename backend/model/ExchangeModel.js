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
    isAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exchange', exchangeSchema)