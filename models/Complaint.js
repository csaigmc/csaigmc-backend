const mongoose = require('mongoose')

const Complaint = new mongoose.Schema({
    complaint_message: {
        type: String,
        maxlength: 2048,
        required: true
    },
    complaint_status: {
        type: String,
        enum: ['pending', 'inprogress', 'resolved'],
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model('Complaint', Complaint)