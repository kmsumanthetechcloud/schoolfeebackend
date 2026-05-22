const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const {
    addFee,
    getFees,
    getStudentFeeHistory,
    getMonthlyRevenue
} = require('../controllers/feeController')


// Add Fee
router.post('/', authMiddleware, addFee)


// Get Fees
router.get('/', authMiddleware, getFees)


// Student Fee History
router.get(
    '/student/:id',
    authMiddleware,
    getStudentFeeHistory
)


// Monthly Revenue Report
router.get(
    '/monthly-revenue',
    authMiddleware,
    getMonthlyRevenue
)

module.exports = router