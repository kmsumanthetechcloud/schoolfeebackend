const Student = require('../models/Student')
const Fee = require('../models/Fee')



// Add Student
exports.addStudent = async (req, res) => {

    try {

        const student = await Student.create({
            ...req.body,
            schoolId: req.schoolId
        })

        res.status(201).json({
            message: 'Student Added',
            student
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}



// Get Students
exports.getStudents = async (req, res) => {

    try {

        const students = await Student.find({
            schoolId: req.schoolId
        })

        const updatedStudents = await Promise.all(

            students.map(async (student) => {

                // Find student fees
                const fees = await Fee.find({
                    studentId: student._id
                })

                // Total Paid Amount
                const paidAmount = fees.reduce(
                    (total, fee) => total + fee.amount,
                    0
                )

                // Current Date
                const currentDate = new Date()

                const currentMonth =
                    currentDate.getMonth() + 1

                const currentYear =
                    currentDate.getFullYear()

                // Months Difference
                const totalMonths =
                    (
                        (currentYear - student.admissionYear) * 12
                    ) +
                    (
                        currentMonth - student.admissionMonth
                    ) + 1

                // Expected Amount
                const expectedAmount =
                    student.monthlyFee * totalMonths

                // Pending Amount
                const pendingAmount =
                    expectedAmount - paidAmount

                // Fee Status
                let feeStatus = 'Unpaid'

                if (pendingAmount <= 0) {
                    feeStatus = 'Paid'
                }

                return {
                    ...student._doc,
                    paidAmount,
                    pendingAmount,
                    feeStatus
                }

            })

        )

        res.status(200).json(updatedStudents)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}



// Get Pending Students
exports.getPendingStudents = async (req, res) => {

    try {

        const students = await Student.find({
            schoolId: req.schoolId
        })

        const pendingStudents = await Promise.all(

            students.map(async (student) => {

                // Student Fees
                const fees = await Fee.find({
                    studentId: student._id
                })

                // Total Paid
                const paidAmount = fees.reduce(
                    (total, fee) => total + fee.amount,
                    0
                )

                // Current Date
                const currentDate = new Date()

                const currentMonth =
                    currentDate.getMonth() + 1

                const currentYear =
                    currentDate.getFullYear()

                // Months Difference
                const totalMonths =
                    (
                        (currentYear - student.admissionYear) * 12
                    ) +
                    (
                        currentMonth - student.admissionMonth
                    ) + 1

                // Expected Amount
                const expectedAmount =
                    student.monthlyFee * totalMonths

                // Pending
                const pendingAmount =
                    expectedAmount - paidAmount

                return {
                    ...student._doc,
                    paidAmount,
                    pendingAmount
                }

            })

        )

        // Only Pending Students
        const filteredPendingStudents =
            pendingStudents.filter(
                (student) => student.pendingAmount > 0
            )

        res.status(200).json(
            filteredPendingStudents
        )

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}



// Delete Student + Related Fees
exports.deleteStudent = async (req, res) => {

    try {

        // Delete Student
        await Student.findByIdAndDelete(req.params.id)

        // Delete Related Fees
        await Fee.deleteMany({
            studentId: req.params.id
        })

        res.status(200).json({
            message: 'Student & Related Fees Deleted Successfully'
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}



// Update Student
exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )

        res.status(200).json({
            message: 'Student Updated Successfully',
            student
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}



// Get Class Wise Analytics
exports.getClassWiseAnalytics = async (req, res) => {

    try {

        const students = await Student.find({
            schoolId: req.schoolId
        })

        const classMap = {}

        for (const student of students) {

            // Find Student Fees
            const fees = await Fee.find({
                studentId: student._id
            })

            // Total Paid
            const paidAmount = fees.reduce(
                (total, fee) => total + fee.amount,
                0
            )

            // Current Date
            const currentDate = new Date()

            const currentMonth =
                currentDate.getMonth() + 1

            const currentYear =
                currentDate.getFullYear()

            // Total Months
            const totalMonths =
                (
                    (currentYear - student.admissionYear) * 12
                ) +
                (
                    currentMonth - student.admissionMonth
                ) + 1

            // Expected Amount
            const expectedAmount =
                student.monthlyFee * totalMonths

            // Pending Amount
            const pendingAmount =
                expectedAmount - paidAmount

            // Class Name
            const className =
                student.className || 'Unknown'

            // Create Class Object
            if (!classMap[className]) {

                classMap[className] = {
                    className,
                    totalStudents: 0,
                    totalCollected: 0,
                    totalPending: 0,
                    students: []
                }

            }

            // Update Data
            classMap[className].totalStudents += 1

            classMap[className].totalCollected +=
                paidAmount

            classMap[className].totalPending +=
                pendingAmount

            // Add Student
            classMap[className].students.push({
                name: student.name,
                pendingAmount
            })

        }

        // Convert Object To Array
        const result =
            Object.values(classMap)

        res.status(200).json(result)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }

}