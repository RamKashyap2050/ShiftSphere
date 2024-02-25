const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    product_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1, adjust as needed
    }
}, { _id: false });

const orderSchema = mongoose.Schema({
    items: [orderItemSchema], // Array of order items
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }
},
{
    collection: 'Orders',
    timestamps: true
});

module.exports = mongoose.model('Orders', orderSchema);
