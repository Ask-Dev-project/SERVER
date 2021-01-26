const app = require("./app");
const http = require("http");
const PORT = process.env.PORT || 3005;

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

app.get('/listRoom',(req,res)=> {
  res.status(200).json(rooms)
})

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

  })
  socket.on('leave-room',obj => {
    delete rooms[obj.roomId][obj.name]
    if(Object.keys(rooms[obj.roomId]).length < 1) delete rooms[obj.roomId]
  })
  socket.on('stop-sharing', roomId => {
    socket.to(roomId).broadcast.emit('stop-sharing')
  })
  socket.on('give-my-id', obj => {
    socket.to(obj.roomId).broadcast.emit('give-other-id',obj.ownPeerId)
  })

})

server.listen(PORT, () => {
  console.log(`listening web in http://localhost:${PORT}`);
});

module.exports = server