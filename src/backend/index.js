const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001

const server = http.createServer(app)
server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`)
})