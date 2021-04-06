
const mongoose = require('mongoose');

const paintingSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Painting' }]
});

module.exports = mongoose.model('Painting', paintingSchema);
