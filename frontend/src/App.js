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
            showNotification({
                error: 'Failed to fetch data from the server'
            })
        }
    }

    const showNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleSelectionChange = (book) => {
        setSelectedBook(book)
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
                handleSelectionChange={handleSelectionChange}
                fetchBooks={fetchBooks}
                showNotification={showNotification}
            />
            <BookList
                books={books}
                selectedBook={selectedBook}
                handleSelectionChange={handleSelectionChange}
            />
        </div>
    )
}

export default App
