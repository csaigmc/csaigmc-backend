const mongoose = require('mongoose')

const Student = new mongoose.Schema({
    roll_no: {type: String, required: true, unique: true},
    first_name: {type: String, maxlength: 255},
    last_name: {type: String, maxlength: 255},
    country_code: {type: String, default: "91"},
    phone_no: {type: String, maxlength: 10, minlength: 10, match: /[0-9]{10}/},
    father_name: {type: String, maxlength: 512},
    mother_name: {type: String, maxlength: 512},
    create_date: {type: Date, default: Date.now}
})

module.exports = new mongoose.model("Student", Student)