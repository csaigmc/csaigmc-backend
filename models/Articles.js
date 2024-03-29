const mongoose = require('mongoose')

const Article = new mongoose.Schema({
    author: {
        type: String,
        maxlength: 512        
    },
    about_author: {
        type: String,
        maxlength: 1024
    },
    title: {
        type: String,
        maxlength: 1024,
    },
    text: {
        type: String,
        maxlength: 0x1 << 16,
        required: true
    },
    article_type: {
        type: String,
        enum: ['enigma', 'isis']
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model('Article', Article)