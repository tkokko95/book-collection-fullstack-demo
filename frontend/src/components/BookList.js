import React from 'react'
const BookList = ({ books, handleSelectionChange }) => {

    const sortedBooks = books.sort((a, b) => a.author.localeCompare(b.author))
    return(
        <ul className='bookList' type='none'>
            {sortedBooks.map((book) => {
                return(
                    <li
                        key={book.id}
                        className='book'
                        onClick={() => handleSelectionChange(book)}
                    >
                        {book.author} - {book.title}
                    </li>
                )
            })}
        </ul>
    )
}

export default BookList