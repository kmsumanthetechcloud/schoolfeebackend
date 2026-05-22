require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./src/routes/authRoutes')
const studentRoutes = require('./src/routes/studentRoutes')
const feeRoutes = require('./src/routes/feeRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// Routes
app.use('/api/auth', authRoutes)

app.use('/api/students', studentRoutes)

app.use('/api/fees', feeRoutes)


// Test Route
app.get('/', (req, res) => {
    res.send('School Fee Management API Running')
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})