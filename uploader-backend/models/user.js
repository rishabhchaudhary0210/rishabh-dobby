const mongoose = require('mongoose');

const userSchema = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    images: [
        {
            name: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },

        }
    ],

}

const User = mongoose.model('User', userSchema);
module.exports = User;