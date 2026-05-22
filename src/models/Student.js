const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({

    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },

    name: {
        type: String,
        required: true
    },

    className: {
        type: String
    },

    fatherName: {
        type: String
    },

    mobile: {
        type: String
    },

    monthlyFee: {
        type: Number
    },

    // Admission Month
    admissionMonth: {
        type: Number,
        default: new Date().getMonth() + 1
    },

    // Admission Year
    admissionYear: {
        type: Number,
        default: new Date().getFullYear()
    },

    feeStatus: {
        type: String,
        default: 'Unpaid'
    },

    dueDate: {
        type: Number
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Student', studentSchema)