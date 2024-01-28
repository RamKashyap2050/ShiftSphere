const { Int32 } = require('bson')
const mongoose = require('mongoose')

const AnnouncementSchema = mongoose.Schema({
   
    
    Employee_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required: true
    },
    
    Announcement_Message: {
        type: String,
    },
    Annoucement_Image: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
      }


},
{   collection: 'Announcement',
    timestamp: true
}) 

module.exports = mongoose.model('Announcement', AnnouncementSchema)