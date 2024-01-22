const express = require('express');

const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const { userConnected, userDisconnected, myTurnFinished, saveResponseOnHistoric } = require('./utils/usersLogic');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.sockets.on('connection', (socket) => { 
    userConnected(io, socket);

    // Listening client data
    socket.on('myTurnFinished', () => { myTurnFinished(socket, io) });
    socket.on('answer', (data) => { saveResponseOnHistoric(data, io) });
    socket.on('disconnect', () => { userDisconnected(socket, io) })
});

server.listen('9000', () => {
    console.log('Server is running 🔥')
})