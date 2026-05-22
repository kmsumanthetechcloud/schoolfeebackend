const Fee = require('../models/Fee')


// Add Fee
exports.addFee = async (req, res) => {

    try {

        // Create Fee Record
        const fee = await Fee.create(req.body)

        res.status(201).json({
            message: 'Fee Added Successfully',
            fee
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}


// Get Fees
exports.getFees = async (req, res) => {

    try {

        const fees = await Fee.find()
            .populate('studentId')

        res.status(200).json(fees)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}


// Get Student Fee History
exports.getStudentFeeHistory = async (req, res) => {

    try {

        const fees = await Fee.find({
            studentId: req.params.id
        })
        .populate('studentId')
        .sort({
            createdAt: -1
        })

        res.status(200).json(fees)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}


// Monthly Revenue Report
exports.getMonthlyRevenue = async (req, res) => {

    try {

        const monthlyRevenue = await Fee.aggregate([

            {
                $group: {
                    _id: '$month',
                    totalRevenue: {
                        $sum: '$amount'
                    }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ])

        res.status(200).json(monthlyRevenue)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}