const School = require('../models/School')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { schoolName, email, password, mobile } = req.body

        const existingSchool = await School.findOne({ email })

        if (existingSchool) {
            return res.status(400).json({
                message: 'School already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const school = await School.create({
            schoolName,
            email,
            password: hashedPassword,
            mobile
        })

        res.status(201).json({
            message: 'School Registered Successfully',
            school
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body

        const school = await School.findOne({ email })

        if (!school) {
            return res.status(400).json({
                message: 'Invalid Email'
            })
        }

        const isMatch = await bcrypt.compare(password, school.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            {
                id: school._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.status(200).json({
            message: 'Login Successful',
            token,
            school
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}