const mongoose = require ('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const booksRouter = require('./controllers/books')


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/books', booksRouter)

// In production mode, we serve the built version of the frontend from /backend/build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
}

// This router just includes a fast way for cleaning up the DB
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(middleware.errorHandler)

// We assume seperate DB:s are to be used in test and production/dev modes
const MONGO_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting:', error.message)
    })

module.exports = app
