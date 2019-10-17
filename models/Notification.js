const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
    notification_text: {
        type: String,
        maxlength: 1024,
        required: true
    },
    notification_url: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("Notification", Notification)