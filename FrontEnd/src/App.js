import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

import socket from "./socket";
import sketch from "./sketch";

import HeaderInfos from "./components/HeaderInfos";
import SendResponse from "./components/SendResponse";
import Historic from "./components/Historic";

import trophyImage from "./images/trophy.webp";
import microphoneImage from "./images/microphone.webp";

function App() {
    const [isInitializePossible, setIsInitializePossible] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [wordGenerated, setWordGenerated] = useState('');
    const [isCorrectResponse, setIsCorrectResponse] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
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

        socket.on('break', () => {
            setIsBreakTime(true);
        })

        socket.on('finishBreak', () => {
            setIsBreakTime(false);
        })
    }, [socket]);



    return (
        <div className={`App min-h-[100vh] bg-gradient-to-r from-purple-200 to-[#8C52FF] font-display relative`}>
            <div className={`absolute top-0 left-0 bg-gray-600 w-[100vw] h-[100vh] ${isBreakTime ? 'opacity-85 z-20' : 'opacity-0'}`}></div>
            <div className={`w-[90%] mx-auto pt-[60px] max-w-[1200px]`}>
                <HeaderInfos isMyTurn={isMyTurn} wordGenerated={wordGenerated} timer={timer} />

                <div className={'flex items-end justify-between'}>
                    <div className={`relative`}>
                        <div className={`border-[#fff] border-4 rotate-[-3deg] w-[750px]`}>
                            <div className={`rotate-[3deg] ${isMyTurn ? '' : 'pointer-events-none cursor-not-allowed'}`}>
                                <ReactP5Wrapper sketch={sketch} />
                            </div>
                        </div>
                        <img className="absolute bottom-[-50px] left-[-80px]" width="140px" height="140px" alt="Troféu" src={trophyImage} /> 
                    </div>

                    <div className={`border-[#fff] border-4 rotate-3 w-[330px]`}>
                        <img className="absolute top-[-80px] right-[-20px] z-10" width={140} height={140} alt="Megafone" src={microphoneImage} />

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
