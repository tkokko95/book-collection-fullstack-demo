//This router is only used in testing mode, for quick initialization of the database

const testingRouter = require('express').Router()
const Book = require('../models/book')

testingRouter.post('/reset', async (request, response) => {
    await Book.deleteMany({})
    response.status(204).end()
})

module.exports = testingRouter