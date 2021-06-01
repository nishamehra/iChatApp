// Node server which will handle socket io connetions
const io = require('socket.io')(8000)


const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
       // console.log("New User", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    
    /*socket.on('typing', () =>{
        socket.broadcast.emit('typing...', {name: users[socket.id]});
    });*/
    
    /*socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            name: users[socket.id]
        });
      });*/
      
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})