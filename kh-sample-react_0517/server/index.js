const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server, {
    cors:{
        origin: "*",
        credentials: true
    }
});

const port = 4000;

io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        io.emit('message', ({name, message}));
    });
    socket.on('disconnection', ({name}) => {
        io.emit('message', {name, message: '님이 나가셨습니다'});
    })
});

server.listen(port, function(){
    console.log(`${port}번에 포트가 연결되었습니다`);
});