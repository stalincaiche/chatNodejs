const express = require('express');

const app     = express();

const server  = require('http').Server(app);

const io      = require('socket.io')(server);

// cargamos vista
app.use(express.static('client'));
app.use(express.static('media'));


// creamos rutas
app.get( '/', (req, res) => {
    res.status(200).send('Route root');
});

// llega mensaje
const message = [{
    id: 1,
    text: 'Bienvenido al chat privado de Sokect.io y NOdejs',
    nickname: 'Bot - stalin.caiche@gmail.com'
}];


//abrimos conexion socket
io.on('connection', ( socket ) => {
   console.log("El nodo con IP: "+socket.handshake.address+" se ha conectado...");

   socket.emit('messages', message);

   socket.on('add-message', ( data ) => {
       message.push(data);

       io.sockets.emit('messages', message);
   });



});








// creamos el servidor con express
server.listen(6677, () => {
    console.log('Server on');
});