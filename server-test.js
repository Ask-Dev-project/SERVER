const server = require('./socketConfig')
const http = require('./server')

server.attach(http)