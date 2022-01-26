const express = require("express");
const { Socket } = require("socket.io");
const app = express ();

const http = require("http").createServer(app);


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const PORT = 3000;
http.listen(PORT, ()=>{
  console.log(`Chat App working on Port: ${PORT}`);
});

// Socket.IO
const io = require("socket.io")(http);

io.on('connection', (socket)=>{
  console.log('Connected')

  // Catching Message Comming From CLient
  socket.on('message', (msg)=>{
    socket.broadcast.emit('message', msg);
  })
})