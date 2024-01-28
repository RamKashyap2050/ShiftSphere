const { Int32 } = require('bson')
const mongoose = require('mongoose')

const RestaurentSchema = mongoose.Schema({
   
    
    Restaurent_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    
    Restaurent_phone: {
        type: String,
        required: [true, 'Please enter your phone']
    },
    Restaurent_email: {
        type: String,
        required: [true, 'Please enter your email']
    },
    Restaurent_Logo: {
        type: String
    }

},
{   collection: 'Restaurent',
    timestamp: true
}) 

module.exports = mongoose.model('Restaurent', RestaurentSchema)