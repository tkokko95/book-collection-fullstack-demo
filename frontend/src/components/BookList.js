import React from 'react'
const BookList = ({ books, handleSelectionChange, selectedBook }) => {
    const sortedBooks = books.sort((a, b) => a.author.localeCompare(b.author))
    return(
        <ul type='none' className='bookList'>
            {sortedBooks.map((book) => {
                return(
                    <li
                        key={book.id}
                        className={selectedBook?.id === book.id ? 'selectedBook' : 'book'}
                        onClick={() => handleSelectionChange(book)}
                    >
                        {book.author} - <strong>{book.title}</strong>
                    </li>
                )
            })}
        </ul>
    )
}

export default BookList