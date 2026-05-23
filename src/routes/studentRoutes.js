const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    getPendingStudents,
    getClassWiseAnalytics
} = require('../controllers/studentController')


// Add Student
router.post('/', authMiddleware, addStudent)


// Get Students
router.get('/', authMiddleware, getStudents)


// Pending Students
router.get(
    '/pending',
    authMiddleware,
    getPendingStudents
)

router.get(
    '/class-wise-analytics',
    authMiddleware,
    getClassWiseAnalytics
)

// Delete Student
router.delete('/:id', authMiddleware, deleteStudent)


// Update Student
router.put('/:id', authMiddleware, updateStudent)


module.exports = router