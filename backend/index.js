const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001

const server = http.createServer(app)
server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`)
})

// Not sure if this really matters but it doesn't hurt either
process.on('SIGINT', () => {
    logger.info('\nSIGINT received. Exiting...')
    server.close()
    mongoose.disconnect()
})