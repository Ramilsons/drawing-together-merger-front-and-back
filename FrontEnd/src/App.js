import { useState, useEffect, createContext } from "react";

import socket from "./socket";

import HeaderInfos from "./components/HeaderInfos";
import TimeBreakOverlay from "./components/TimeBreakOverlay";
import DrawSpaceAndHistoricContainer from "./components/DrawSpaceAndHistoricContainer";

export const GlobalData = createContext(null);

function App() {
    const [isInitializePossible, setIsInitializePossible] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [wordGenerated, setWordGenerated] = useState('');
    const [isCorrectResponse, setIsCorrectResponse] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [timer, setTimer] = useState(60);
    const [coordsMouseMoved, setCoordsMoved] = useState(false);

    useEffect(() => {
        socket.connect();

        // Listening server data
        socket.on('userNumberChanged', (data) => {
            setIsInitializePossible(data.isPossibleInit);
        });
    }, []);

    useEffect(() => {
        // when my drawing turn initialize
        socket.on('yourTurn', () => {
            setIsMyTurn(true);
        });

        socket.on('wordGenerated', (data) => {
            setWordGenerated(data);
        })

        socket.on('timerController', (timerFromBackend) => {
            setTimer(timerFromBackend);
        })

        // when break time initialize 
        socket.on('break', () => {
            setIsBreakTime(true);
        })

        // when break time finished
        socket.on('finishBreak', () => {
            setIsBreakTime(false);
        })

        // when my drawing turn finished
        socket.on('finishDrawingTurn', () => {
            setIsMyTurn(false);
        })

        socket.on('opponentMouseMoved', (mouseCoords) => {
            setCoordsMoved({
                x: mouseCoords.x,
                y: mouseCoords.y
            })
        })
    }, [socket]);

    return (
        <div className={`App min-h-[100vh] bg-gradient-to-r from-purple-200 to-[#8C52FF] font-display relative`} id="background">
            <TimeBreakOverlay isBreakTime={isBreakTime} isMyTurn={isMyTurn} />
            
            <main className={`w-[90%] mx-auto pt-[60px] max-w-[1200px]`}>
                <GlobalData.Provider value={{ isMyTurn, wordGenerated, timer, setIsCorrectResponse, coordsMouseMoved, isBreakTime }}>
                    <HeaderInfos />

                    <DrawSpaceAndHistoricContainer />
                </GlobalData.Provider>
            </main>
        </div>
    );
}

export default App;
