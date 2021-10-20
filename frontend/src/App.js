import React, {useState, useEffect} from 'react'

import booksService from './services/books'
import BookList from './components/BookList'
import BookForm from './components/BookForm'



const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState({
    title: '',
    author: '',
    description: ''
  })

  const fetchBooks = async () => {
    const fetchedBooks = await booksService.getAll()
    setBooks(fetchedBooks)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSelectionChange = (book) => {
    setSelectedBook(book)
  }
  

  return (
    <div>
      <BookForm
      selectedBook={selectedBook}
      handleSelectionChange={handleSelectionChange}
      fetchBooks={fetchBooks}
      />
      <BookList
      books={books}
      handleSelectionChange={handleSelectionChange}
      />
    </div>
  )
}

export default App;
