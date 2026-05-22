const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    schoolName: {
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
    mobile: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('School', schoolSchema)