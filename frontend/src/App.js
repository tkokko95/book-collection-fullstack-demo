import React, { useState, useEffect } from 'react'

import booksService from './services/books'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import Notification from './components/Notification'

const App = () => {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState({
        title: '',
        author: '',
        description: ''
    })
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await booksService.getAll()
            setBooks(fetchedBooks)
        } catch (error) {
            setNotification({
                error: 'Failed to fetch data from the server'
            })
        }
    }

    return (
        <div className='mainContainer'>
            <Notification
                message={notification?.info || notification?.error}
                className={`
                    ${notification?.error ? 'error' : 'info'}
                    notification
                `}
            />
            <br />
            <BookForm
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                fetchBooks={fetchBooks}
                setNotification={setNotification}
            />
            <BookList
                books={books}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
            />
        </div>
    )
}

export default App
