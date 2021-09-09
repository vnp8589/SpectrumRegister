const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

const user = mongoose.model('User', userSchema);

module.exports = user;
