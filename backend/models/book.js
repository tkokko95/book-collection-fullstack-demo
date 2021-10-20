const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    author: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: false,
        maxlength: 150
    }  
})
bookSchema.plugin(uniqueValidator)

bookSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Book', bookSchema)