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
        try {
            await booksService.create(formData)
            await fetchBooks()
            setFormData(blankForm)
            showNotification({
                info: 'Book successfully added'
            })
        } catch(error) {
            showNotification({
                error: error.message
            })
        }
    }

    const handleSubmitEdit = async () => {
        try {
            await booksService.update(formData, selectedBook.id)
            setFormData(blankForm)
            handleSelectionChange(blankForm)
            showNotification({
                info: 'Book successfully modified'
            })
        } catch(error) {
            showNotification({
                error: `${error.message}: someone might have deleted this item`
            })
        } finally {
            await fetchBooks()
        }
    }

    const handleDeleteButton = async () => {
        try {
            await booksService.remove(selectedBook.id)
            setFormData(blankForm)
            handleSelectionChange(blankForm)
            showNotification({
                info: 'Book successfully deleted'
            })
        } catch(error) {
            showNotification({
                error: `${error.message}: someone might already have deleted this item`
            })
        } finally {
            await fetchBooks()
        }
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