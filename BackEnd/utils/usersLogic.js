let words = require('./words');

let usersConnected = 0;
let wordsHistoric = [];

function userConnected(io, socket) {
    console.log('New User');
    usersConnected++;

    verifyLimit(io, socket);
}

function userDisconnected() {
    console.log('User Disconnected');
    usersConnected--;
}


function verifyLimit(io, socket) {
    if(usersConnected >= 2) {
        // Sending data to client
        io.emit('userNumberChanged', { isPossibleInit: true, usersConnected: usersConnected });
        socket.broadcast.emit('yourTurn');
    }else {
       // socket.broadcast.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });

       // Sending data to client
       io.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });
    }
}

function myTurnFinished(socket, io) {
    let wordToDraw = '';
    let controller = false;

    while(controller != true) {

        let randomNumber = Math.floor(Math.random() * words.length);
        let randomWord = words[randomNumber];
        

        if(wordsHistoric.indexOf(randomWord) == -1) {
            wordToDraw = randomWord;

            io.emit('wordGenerated', wordToDraw);
            controller = true;
        }
    }
    
    socket.broadcast.emit('yourTurn'); 
}


module.exports = {userConnected, userDisconnected, myTurnFinished};