
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});

module.exports = mongoose.model('Customer', customerSchema);
