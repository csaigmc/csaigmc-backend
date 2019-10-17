const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        maxlength: 1024,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/,
        required: true
    }
})

module.exports = new mongoose.model("User", User)