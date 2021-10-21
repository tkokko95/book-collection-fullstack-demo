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
        if (formData.title && formData.author) {
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
                info: 'Book succesfully added'
            })
        } catch(error) {
            showNotification({
                error: `${error}: Make sure that the title doesn't already exist`
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
                error: `${error.message}: This item might have been deleted`
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
                error: `${error.message}: This item might have already been deleted`
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
                Title *
                <br/>
                <input
                    type='text'
                    value={formData.title}
                    name='title'
                    id='titleInput'
                    onChange={handleChange}
                    maxLength='50'
                />
            </label>
            <br />
            <label>
                Author *
                <br/>
                <input
                    type='text'
                    value={formData.author}
                    name='author'
                    id='authorInput'
                    onChange={handleChange}
                    maxLength='50'
                />
            </label>
            <br />
            <label>
                Description
                <br/>
                <textarea
                    type='text'
                    rows='10'
                    columns='10'
                    value={formData.description}
                    name='description'
                    id='descriptionInput'
                    maxLength='150'
                    onChange={handleChange}
                />
            </label>
            <br />
            <button disabled={editMode || !formDataIsValid()} onClick={handleSubmitNew} id='saveNewButton'>Save New</button>
            <button disabled={!editMode || !formDataIsValid()} onClick={handleSubmitEdit} id='saveEditedButton'>Save</button>
            <button disabled={!editMode} onClick={handleDeleteButton} id='deleteButton'>Delete</button>
            <button disabled={!editMode} onClick={handleCancelButton} id='cancelButton'>Cancel</button>
        </div>
    )

}

export default BookForm