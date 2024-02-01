import { useState, useContext } from "react";

import { GlobalData } from "../App";
import socket from "../socket";

import sendIcon from './../images/send-icon.png'

export default function SendResponse() {
    const [userResponse, setUserResponse] = useState('');
    const { wordGenerated, setIsCorrectResponse } = useContext(GlobalData);

    function verifyResponse() {
        socket.emit('answer', userResponse.toLowerCase());

        if(userResponse.toLowerCase() === wordGenerated.toLowerCase()) {
            setIsCorrectResponse(true);
            socket.emit('timeBreak');
        } else {
            setIsCorrectResponse(false);
        }

        setUserResponse('');
    }

    function newResponse(e) {
        setUserResponse(e.target.value);
    }

    function handleKeyDown(e) {
        if(e.key === "Enter") {
            verifyResponse();
        }
    }

    return (
        <div className={'absolute bottom-0 h-[60px] w-[100%] border-t-2 p-3 flex items-center justify-between'}>
            <input className={'border-b-2 w-[250px]  h-[40px] focus:outline-none'} placeholder="Escreva aqui..." value={userResponse} onKeyDown={handleKeyDown} type="text" onChange={(e) => { newResponse(e) }}></input>
            <button className={'border-2 rounded-xl w-[50px] h-[40px] flex items-center justify-center'} type="button" onClick={verifyResponse} aria-label="Enviar palavra">
                <img src={sendIcon} loading="lazy" alt="Avião de papel" width={35} height={35} />
            </button>
        </div>
    );
}
