import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

import socket from "./socket";
import sketch from "./sketch";

import SendResponse from "./components/SendResponse";

function App() {
    const [isInitializePossible, setIsInitializePossible] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [wordGenerated, setWordGenerated] = useState('');
    const [isCorrectResponse, setIsCorrectResponse] = useState(false);

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
            }, 30000)
        });

        socket.on('wordGenerated', (data) => {
            setWordGenerated(data);
        })
    }, [socket]);  

    useEffect(() => {
        console.log(isCorrectResponse);
    }, [isCorrectResponse]);

    return (
        <div className={`App bg-black ${isInitializePossible ? 'bg-purple-300' :  ''}`}>
            <p>{ isMyTurn ? 'Sua Vez' : 'Vez do Oponente'}</p>

            <p>{ isMyTurn && wordGenerated.length > 0 ? wordGenerated : ''}</p>
            { !isMyTurn && wordGenerated.length > 0 ? <SendResponse correctResponse={wordGenerated} state={setIsCorrectResponse} /> : '' }

            { !isMyTurn && isCorrectResponse ? <p>{'Parabéns! você acertou.'}</p> : ''}
            <ReactP5Wrapper sketch={sketch} />
        </div>
    );
}

export default App;
