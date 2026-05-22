const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent,
    getPendingStudents
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


// Delete Student
router.delete('/:id', authMiddleware, deleteStudent)


// Update Student
router.put('/:id', authMiddleware, updateStudent)


module.exports = router