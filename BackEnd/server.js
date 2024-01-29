const express = require('express');

const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const { userConnected, userDisconnected, myTurnDrawFinished, saveResponseOnHistoric, managerTimeBreak, clearHistoricResponse, managerMouseMovement } = require('./utils/usersLogic');

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
    socket.on('myTurnDrawFinished', () => { myTurnDrawFinished(socket, io) });
    socket.on('answer', (data) => { saveResponseOnHistoric(data, io) });
    socket.on('disconnect', () => { userDisconnected(socket, io) });
    socket.on('timeBreak', () => { managerTimeBreak(socket, io, true) });
    socket.on('clearAllHistoricResponse', () => { clearHistoricResponse() });
    socket.on('mouseMoved', (mouseCoords) => { console.log("on mouseMoved", mouseCoords); managerMouseMovement(socket, io, mouseCoords) });
});

server.listen('9000', () => {
    console.log('Server is running 🔥')
})