import React, { useState, useEffect } from 'react'
import booksService from '../services/books'
import FormFields from './FormFields'

const BookForm = ({ selectedBook, setSelectedBook, fetchBooks, setNotification }) => {
    const blankForm = {
        title: '',
        author: '',
        description:''
    }
    const [formData, setFormData] = useState(blankForm)
    const editMode = selectedBook.title ? true : false

    useEffect(() => {
        setFormData(selectedBook)
    }, [selectedBook])

    const formDataIsValid = () => {
        if (formData.title && formData.author) {
            return true
        }
        return false
    }

    const handleSubmitNew = async () => {
        try {
            const response = await booksService.create(formData)
            await fetchBooks()
            setFormData(blankForm)
            setNotification({
                info: `Book succesfully added: ${response.title}`
            })
        } catch(error) {
            setNotification({
                error: `${error}: Make sure that the title doesn't already exist`
            })
        }
    }

    const handleSubmitEdit = async () => {
        try {
            const response = await booksService.update(formData, selectedBook.id)
            setFormData(blankForm)
            setSelectedBook(blankForm)
            setNotification({
                info: `Book successfully modified: ${response.title}`
            })
        } catch(error) {
            setNotification({
                error: `${error.message}: This item might have been deleted`
            })
        } finally {
            await fetchBooks()
        }
    }

    const handleDeleteButton = async () => {
        try {
            const bookToDelete = selectedBook.title
            await booksService.remove(selectedBook.id)
            setFormData(blankForm)
            setSelectedBook(blankForm)
            setNotification({
                info: `Book successfully deleted: ${bookToDelete}`
            })
        } catch(error) {
            setNotification({
                error: `${error.message}: This item might have already been deleted`
            })
        } finally {
            await fetchBooks()
        }
    }

    const handleCancelButton = () => {
        setSelectedBook(blankForm)
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return(
        <div className='bookForm'>
            <FormFields
                formData={formData}
                handleChange={handleChange}
            />
            <button
                disabled={editMode || !formDataIsValid()}
                onClick={handleSubmitNew}
                id='saveNewButton'
            >
                Save New
            </button>
            <button
                disabled={!editMode || !formDataIsValid()}
                onClick={handleSubmitEdit}
                id='saveEditedButton'
            >
                Save
            </button>
            <button
                disabled={!editMode}
                onClick={handleDeleteButton}
                id='deleteButton'
            >
                Delete
            </button>
            <button
                disabled={!editMode}
                onClick={handleCancelButton}
                id='cancelButton'
            >
                Cancel
            </button>
        </div>
    )
}

export default BookForm