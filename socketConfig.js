const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      // methods: ["GET", "POST"],
      // allowedHeaders: ["allow"],
      // credentials: true
    }
  })
  
const rooms= {}

io.on('connection', socket => {

socket.on('send-chat', obj => {
    socket.to(obj.roomId).broadcast.emit('receive-chat',obj.message)
})
socket.on('join-room', (roomId, userId,jwt) => {
    if(rooms[roomId]) {
    rooms[roomId][jwt] = userId
    }else{
    rooms[roomId] = {
        [jwt] : userId
    }
    }
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
    socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
})
socket.on('stop-sharing', roomId => {
    socket.to(roomId).broadcast.emit('stop-sharing')
})
socket.on('give-my-id', obj => {
    socket.to(obj.roomId).broadcast.emit('give-other-id',obj.ownPeerId)
})

})

module.exports = io