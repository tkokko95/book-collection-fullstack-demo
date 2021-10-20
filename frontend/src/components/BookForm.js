import React, { useState, useEffect } from 'react'
import booksService from '../services/books'

const BookForm = ({ selectedBook, handleSelectionChange, fetchBooks, showNotification }) => {
    const blankForm = {
        title: '',
        author: '',
        description:''
    }
    const [formData, setFormData] = useState(blankForm)
    const editMode = selectedBook.title ? true : false

    const formDataIsValid = () => {
        if (
            formData.title
            && formData.title.length <= 50
            && formData.author
            && formData.author.length <= 50
            && formData.description.length <= 150) {
                return true
        }
        return false
    }


    useEffect(() => {
        setFormData(selectedBook) 
    }, [selectedBook])

    const handleSubmitNew = async () => {
        await booksService.create(formData)
        await fetchBooks()
        setFormData(blankForm)
    }

    const handleSubmitEdit = async () => {
        await booksService.update(formData, selectedBook.id)
        await fetchBooks()
        setFormData(blankForm)
        handleSelectionChange(blankForm)
    }

    const handleDeleteButton = async () => {
        await booksService.remove(selectedBook.id)
        await fetchBooks()
        setFormData(blankForm)
        handleSelectionChange(blankForm)
    }

    const handleCancelButton = () => {
        handleSelectionChange(blankForm)
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return(
        <div className='bookForm'>
        <label>
            Title:
            <br/>
            <input
                type='text'
                value={formData.title}
                name='title'
                onChange={handleChange}
            />
        </label>
        <br />
        <label>
            Author:
            <br/>
            <input
                type='text'
                value={formData.author}
                name='author'
                onChange={handleChange}/>
        </label>
        <br />
        <label>
            Description:
            <br/>
            <textarea
                type='text'
                rows='10'
                columns='10'
                value={formData.description}
                name='description'
                onChange={handleChange}
            />
        </label>
        <br />
            <button disabled={editMode || !formDataIsValid()} onClick={handleSubmitNew}>Save New</button>
            <button disabled={!editMode || !formDataIsValid()} onClick={handleSubmitEdit}>Save</button>
            <button disabled={!editMode} onClick={handleDeleteButton}>Delete</button>
            <button disabled={!editMode} onClick={handleCancelButton}>Cancel</button>
        </div>
    )

}

export default BookForm