import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

import socket from "./socket";
import sketch from "./sketch";

import HeaderInfos from "./components/HeaderInfos";
import SendResponse from "./components/SendResponse";
import Historic from "./components/Historic";

import trophyImage from "./images/trophy.webp";

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

    return (
        <div className={`App min-h-[100vh] bg-gradient-to-r from-purple-200 to-purple-500`}>
            <div className={`w-[90%] mx-auto pt-[60px]`}>
                <HeaderInfos />

                <p>{ isMyTurn ? 'Sua Vez' : 'Vez do Oponente'}</p>

                <p>{ isMyTurn && wordGenerated.length > 0 ? wordGenerated : ''}</p>
                { !isMyTurn && wordGenerated.length > 0 ? <SendResponse correctResponse={wordGenerated} state={setIsCorrectResponse} /> : '' }

                { !isMyTurn && isCorrectResponse ? <p>{'Parabéns! você acertou.'}</p> : ''}
                <div className="relative">
                    <div className={`border-[#fff] border-4 rotate-3 w-[750px]`}>
                        <div className={`rotate-[-3deg]`}>
                            <ReactP5Wrapper sketch={sketch} />
                        </div>
                    </div>
                    <img className="absolute bottom-[-50px] left-[-80px]" width="140px" height="140px" alt="Troféu" src={trophyImage} /> 
                </div>

                <Historic correctResponse={wordGenerated} />
            </div>
        </div>
    );
}

export default App;
