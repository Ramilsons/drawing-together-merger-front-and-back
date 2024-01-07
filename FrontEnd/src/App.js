import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

import socket from "./socket";
import sketch from "./sketch";

function App() {
    const [isInitializePossible, setIsInitializePossible] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [wordGenerated, setWordGenerated] = useState('');

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

        socket.on('wordGenerated', (data) => {
            setWordGenerated(data);
        })
    }, [socket]);  

    return (
        <div className={`App bg-black ${isInitializePossible ? 'bg-purple-300' :  ''}`}>
            <p>{ isMyTurn ? 'Sua Vez' : 'Vez do Oponente'}</p>

            <p>{ isMyTurn && wordGenerated.length > 0 ? wordGenerated : ''}</p>
            <ReactP5Wrapper sketch={sketch} />
        </div>
    );
}

export default App;
