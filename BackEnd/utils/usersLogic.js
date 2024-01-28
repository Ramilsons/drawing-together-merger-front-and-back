let words = require('./words');

let usersConnected = 0;
let isSendFirstTurn = false;
let wordsHistoric = [];
let intervalController;
let breakTime = 10000;

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
        if(isSendFirstTurn == false) {myTurnDrawFinished(socket, io)};
        isSendFirstTurn = true
    }else {
       // socket.broadcast.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });

       // Sending data to client
       io.emit('userNumberChanged', { isPossibleInit: false, usersConnected: usersConnected });
    }
}


// Run when he has finished drawing
function myTurnDrawFinished(socket, io) {
    initTimerAndGenerateRandomWord(socket, io, true);
    
    // your turn to draw
    socket.broadcast.emit('yourTurn'); 

    let idIsNotDrawing = socket.id;

    // send to me "is not my turn to draw"
    io.to(idIsNotDrawing).emit('finishDrawingTurn');
}

function saveResponseOnHistoric(data, io) {
    wordsHistoric.push(data);

    io.emit('newResponseOnHistoric', wordsHistoric);
}

// Run when user send correct answer and rival draw is finished
function rivalDrawFinished(socket, io) {  
    myAnswerTurnFinished(socket, io);
}

function myAnswerTurnFinished(socket, io) {
    initTimerAndGenerateRandomWord(socket, io, false);

    let idIsNotDrawing = socket.id;
    // my turn to draw
    io.to(idIsNotDrawing).emit('yourTurn');

    // send to rival "is not your turn to draw"
    socket.broadcast.emit('finishDrawingTurn');
}

function managerTimeBreak(socket, io, isRivalDrawnTurnFinished) {
    clearInterval(intervalController);
    io.emit('break');

    setTimeout(() => {
        io.emit('finishBreak');

        if(isRivalDrawnTurnFinished) {
            rivalDrawFinished(socket, io);
        } else {
            myAnswerTurnFinished(socket, io);
        }
    }, breakTime);
}

function clearHistoricResponse() {
    wordsHistoric = [];
}

function initTimerAndGenerateRandomWord(socket, io, isRivalDrawnTurnFinished) {
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
                } else if(timer == 0) {
                    managerTimeBreak(socket, io, isRivalDrawnTurnFinished);
                }
            }, 1000)
            controller = true;
        }
    }
}

module.exports = {userConnected, userDisconnected, myTurnDrawFinished, saveResponseOnHistoric, managerTimeBreak, clearHistoricResponse};