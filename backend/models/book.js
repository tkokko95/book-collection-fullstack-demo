const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// The required fields and maximum lengths are also enforced by the client
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

// We rename the _id field into id and make sure it's a string and get rid of the unnecessary __v field
bookSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Book', bookSchema)