import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

import socket from "./socket";
import sketch from "./sketch";

function App() {
    const [isInitializePossible, setIsInitializePossible] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);

    useEffect(() => {
        socket.connect();

        // Listening server data
        socket.on('userNumberChanged', (data) => {
            setIsInitializePossible(data.isPossibleInit);
        });
    }, []);


    useEffect(() => {
        socket.on('yourTurn', () => {
            setIsMyTurn(true);

            setTimeout(() => {
                socket.emit('myTurnFinished');
                setIsMyTurn(false);
            }, 10000)
        });
    }, [socket]);

    return (
        <div className={`App bg-black ${isInitializePossible ? 'bg-purple-300' :  ''}`}>
            <p>{ isMyTurn ? 'Sua Vez' : 'Vez do Oponente'}</p>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    );
}

export default App;
