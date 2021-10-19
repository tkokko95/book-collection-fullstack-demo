const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    switch (error.name) {
    case 'CastError':
        if (error.kind === 'ObjectId') {
            return response.status(400).json({ error: 'Malformatted object ID' })
        }
        else {
            return response.status(400).json({ error: error.message })
        }
    case 'ValidationError':
        return response.status(400).json(error.message)
    case 'SyntaxError':
        return response.status(400).json({ error: 'Malformatted request' })
    default:
        next(error)
    }
}

module.exports = { errorHandler }