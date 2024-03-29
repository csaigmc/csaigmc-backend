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
    art_type: {
        type: String,
        enum: ['gallery', 'meme', 'art'],
        required: true
    },
    url_path: {
        type: String,
        required: true
    },
    art_format: {
        type: String,
        required: true,
        enum: ['video', 'image']
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("Art", Art)