const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    amount: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    paymentMode: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank', 'Card'],
        default: 'Cash'
    },

    paidDate: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Fee', feeSchema)