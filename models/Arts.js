const mongoose = require('mongoose')

const Art = new mongoose.Schema({
    creator: {
        type: String,
        maxlength: 512,
        default: null
    },
    about_creator: {
        type: String,
        maxlength: 1024
    },
    url_path: {
        type: String,
        required: true,
        unique: true
    },
    art_type: {
        type: String,
        required: true,
        enum: ['video', 'audio']
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("Art", Art)