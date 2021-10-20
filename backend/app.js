const mongoose = require ('mongoose')
const express = require('express')
require('dotenv').config()

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const booksRouter = require('./controllers/books')

const app = express()

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

app.use(express.json())
app.use('/api/books', booksRouter)
app.use(middleware.errorHandler)

module.exports = app
