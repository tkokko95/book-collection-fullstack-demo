import React from 'react'

const FormFields = ({ formData, handleChange }) => {
    return(
        <div className='formFields'>
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
        </div>
    )
}


export default FormFields