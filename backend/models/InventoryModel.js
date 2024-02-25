const { Int32 } = require('bson')
const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    product_description: {
        type: String,
        required: [true, 'Please enter your phone']
    },
    stock_number: {
        type: String,
        required: [true, 'Please enter your password']
    },
    image:{
        type: String
    },
    price:{
        type: String,
        required: true
    }
},
{   
    collection: 'Inventory',
    timestamp: true
}) 

module.exports = mongoose.model('Inventory', inventorySchema)
