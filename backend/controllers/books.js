const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (request, response, next) => {
    try {
        const allBooks = await Book.find({})
        response.json(allBooks)
    } catch(error) {
        next(error)
    }
})

booksRouter.delete('/:id', async (request, response, next) => {
    try {
        const bookToDelete = await Book.findById(request.params.id)
        if (!bookToDelete) {
            response.status(404).json({ error: 'Object ID doesn\'t exist' })
        }
        else {
            await bookToDelete.remove()
            response.status(204).end()
        }
    } catch(error) {
        next(error)
    }
})

booksRouter.put('/:id', async (request, response, next) => {
    try {
        const book = request.body
        const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, {new: true})
        if (!updatedBook) {
            response.status(404).json({error:'Object ID doesn\'t exist'})
        }
        else {
            response.json(updatedBook)
        }
    } catch(error) {
        next(error)
    }
})

booksRouter.post('/', async (request, response, next) => {
    try {
        const newBook = new Book(request.body)
        const savedBook = await newBook.save()
        response.status(201).json(savedBook)
    } catch(error) {
        next(error)
    }
})

module.exports = booksRouter