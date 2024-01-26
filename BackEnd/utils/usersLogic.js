let words = require('./words');

let usersConnected = 0;
let isSendFirstTurn = false;
let wordsHistoric = [];

function userConnected(io, socket) {
    console.log('New User');
    usersConnected++;

    verifyLimit(io, socket);
}

function userDisconnected(io, socket) {
    console.log('User Disconnected');
    if(usersConnected > 0) {
        usersConnected--;
        verifyLimit(io, socket);
    }
}

function verifyLimit(io, socket) {
    if(usersConnected == 2) {
        // Sending data to client
        io.emit('userNumberChanged', { isPossibleInit: true, usersConnected: usersConnected });
        if(isSendFirstTurn == false) {myTurnFinished(socket, io)};
        isSendFirstTurn = true
    }else {
       // socket.broadcast.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });

       // Sending data to client
       io.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });
    }
}

let intervalController;

function myTurnFinished(socket, io) {
    let timer = 60;
    let wordToDraw = '';
    let controller = false;

    while(controller != true) {

        let randomNumber = Math.floor(Math.random() * words.length);
        let randomWord = words[randomNumber];
        

        if(wordsHistoric.indexOf(randomWord) == -1) {
            wordToDraw = randomWord;

            io.emit('wordGenerated', wordToDraw);

            intervalController = setInterval(() => {
                if(timer > 0) {
                    timer = timer - 1;
                    io.emit('timerController', timer);
                }
            }, 1000)
            controller = true;
        }
    }
    
    socket.broadcast.emit('yourTurn'); 
}

function saveResponseOnHistoric(data, io) {
    wordsHistoric.push(data);

    io.emit('newResponseOnHistoric', wordsHistoric);
}

function managerTimeBreak(socket, io) {
    io.emit('break');

    setTimeout(() => {
        io.emit('finishBreak');
        clearInterval(intervalController);
        myTurnFinished(socket, io);
    }, 10000);
}

module.exports = {userConnected, userDisconnected, myTurnFinished, saveResponseOnHistoric, managerTimeBreak};