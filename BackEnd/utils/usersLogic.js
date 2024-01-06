let usersConnected = 0;

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

function myTurnFinished(socket) {
    socket.broadcast.emit('yourTurn'); 
}


module.exports = {userConnected, userDisconnected, myTurnFinished};