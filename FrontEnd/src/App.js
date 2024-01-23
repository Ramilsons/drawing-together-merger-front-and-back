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
    const [timer, setTimer] = useState(60);

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
            }, 60000)
        });

        socket.on('wordGenerated', (data) => {
            setWordGenerated(data);
        })

        socket.on('timerController', (timerFromBackend) => {
            setTimer(timerFromBackend);
        })
    }, [socket]);



    return (
        <div className={`App min-h-[100vh] bg-gradient-to-r from-purple-200 to-[#8C52FF] font-display`}>
            <div className={`w-[90%] mx-auto pt-[60px] max-w-[1200px]`}>
                <HeaderInfos isMyTurn={isMyTurn} wordGenerated={wordGenerated} timer={timer} />

                <div className={'flex items-end justify-between'}>
                    <div className={`relative ${isMyTurn ? '' : 'pointer-events-none'}`}>
                        <div className={`border-[#fff] border-4 rotate-[-3deg] w-[750px]`}>
                            <div className={`rotate-[3deg]`}>
                                <ReactP5Wrapper sketch={sketch} />
                            </div>
                        </div>
                        <img className="absolute bottom-[-50px] left-[-80px]" width="140px" height="140px" alt="Troféu" src={trophyImage} /> 
                    </div>

                    <div className={`border-[#fff] border-4 rotate-3 w-[330px   ]`}>
                        <div className={`rotate-[-3deg] bg-[#fff] h-[500px] w-[330px]`}>
                            <div className={'py-5 px-4'}>
                                <Historic correctResponse={wordGenerated} isMyTurn={isMyTurn} />
                            </div>
                            { !isMyTurn && wordGenerated.length > 0 ? <SendResponse correctResponse={wordGenerated} state={setIsCorrectResponse} /> : '' }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
