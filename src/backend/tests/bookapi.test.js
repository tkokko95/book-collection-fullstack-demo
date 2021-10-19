const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Book = require('../models/book')

const api = supertest(app)

const url = '/api/books'
const initialBookCollection = [
    {
        title: 'Book 1',
        author: 'Author 1',
        description: 'This is the first test book.'
    },
    {
        title: 'Book 2',
        author: 'Author 2',
        description: 'This is the second test book.'
    },
    {
        title: 'Book 3',
        author: 'Author 3',
        description: 'This is the third test book.'
    }
]

beforeAll(async () => {
    await Book.deleteMany({})
    const bookObjects = initialBookCollection.map((book) => new Book(book))
    const promiseArray = bookObjects.map((book) => book.save())
    await Promise.all(promiseArray)
})

test('GET returns all the books', async () => {
    const response = await api.get(url)
    expect(response.body).toHaveLength(initialBookCollection.length)
})

test('POST:ing a new book works properly', async () => {
    const newBook = {
        title: 'This Is A New Book',
        author: 'This Is Its Author'
    }

    await api
        .post(url)
        .send(newBook)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const bookQuery = await api.get(url)
    const allTitles = bookQuery.body.map((book) => book.title)

    expect(bookQuery.body).toHaveLength(initialBookCollection.length + 1)
    expect(allTitles).toContain('This Is A New Book')

})

test('DELETE works properly', async () => {
    const bookQuery = await api.get(url)
    const allBooks = bookQuery.body
    const idToDelete = allBooks[0].id

    await api
        .delete(`${url}/${idToDelete}`)
        .expect(204)
    
    const updatedBookQuery = await api.get(url)
    const allIds = updatedBookQuery.body.map((book) => book.id)

    expect(updatedBookQuery.body).toHaveLength(allBooks.length - 1)
    expect(allIds).not.toContain(idToDelete)
})

test('PUT works properly', async () => {
    const bookQuery = await api.get(url)
    const allBooks = bookQuery.body
    const bookToModify = allBooks[0]

    const modifiedBook = {
        ...bookToModify,
        title: 'Modified Book'
    }

    await api
        .put(`${url}/${bookToModify.id}`)
        .send(modifiedBook)
        .expect(200)
    
    const updatedBookQuery = await api.get(url)
    const allTitles = updatedBookQuery.body.map((book) => book.title)
    expect(allTitles).toContain('Modified Book')
})

test('Not accepting entries with missing title or author', async () => {
    const bookWithoutTitle = {
        author: 'John Doe',
    }

    await api
        .post(url)
        .send(bookWithoutTitle)
        .expect(400)
    
    const bookWithoutAuthor = {
        title: 'I Have No Author'
    }

    await api
        .post(url)
        .send(bookWithoutAuthor)
        .expect(400)
})

test('Title and author fields can\'t be longer than 50 characters', async () => {
    const tooLongAuthor = {
        title: 'Some Title',
        author: 'Mihaly Dumitru Margareta Corneliu Leopold Blanca Karol Aeon Ignatius Raphael Maria Niketas A. Shilage'
    }

    await api
        .post(url)
        .send(tooLongAuthor)
        .expect(400)
    
    const tooLongTitle = {
        title: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        author: 'Probably me after running these tests'
    }

    await api
        .post(url)
        .send(tooLongTitle)
        .expect(400)

})

test('Description can\'t be longer than 150 characters', async () => {
    const tooLongDescription = {
        title: 'Some Title',
        author: 'Some Author',
        description: 'ASDFGHHJJSDFDSFEFSDFEWFSDHDSIOFHSDOFHSDUFSDIFBHEUIBFIDSBFYSDBFUDSBFYDSFYBDSYIUBIDSFDSJFOSDJPFEOSJFPSÅJIPDSJFIOESFHNOIDSNFUOIDSNFUOPNSUEONFUDSNFUDSFPNSDNFUONSDFN'
    }

    await api
        .post(url)
        .send(tooLongDescription)
        .expect(400)
})


test('Malformatted and valid but nonexistent IDs are handled accordingly', async () => {
    await api
        .delete('/api/books/ThisIsAnInvalidId')
        .expect(400)
    
    await api
        .delete('/api/books/616f30000c866101c7d33e0e')
        .expect(404)
})


afterAll(() => {
    mongoose.disconnect()
})