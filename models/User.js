const mongoose = require('mongoose')

const User = new mongoose.Schema({
    user: {
        type: String,
        maxlength: 512,
        default: null
    },
    about_user: {
        type: String,
        maxlength: 1024
    },
    user_type: {
        type: String,
        enum: ['student','teacher'],
        required: true
    },
    url_path: {
        type: String,
        required: true
    },
    phone_no: {
        type: String
    },
    email: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("User", User)