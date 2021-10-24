const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    switch (error.name) {
    case 'CastError':
        if (error.kind === 'ObjectId') {
            return response.status(400).json({
                errorMessage: 'Malformatted object ID',
                errorName: error.name })
        }
        else {
            return response.status(400).json({
                errorMessage: error.message,
                errorName: error.name
            })
        }

    case 'ValidationError':
        return response.status(400).json({
            errorMessage: error.message,
            errorName: error.name
        })

    case 'SyntaxError':
        return response.status(400).json({
            errorMessage: 'Malformatted request',
            errorName: error.name
        })

    default:
        next(error)
    }
}

module.exports = { errorHandler }