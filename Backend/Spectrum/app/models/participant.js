const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({
    email: {
        type: String, 
        required: true 
    },
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    college: {
        type: String,
        required: true
    }, 
    foodType: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    qrCode: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const participant = mongoose.model('Participant', participantSchema);

module.exports = participant;