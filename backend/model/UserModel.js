const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 1000,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    farmId: {
        type: String,
        required: false,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)