const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    company: String
}, {
    timestamps: true
});

module.exports = mongoose.model('business', businessSchema);