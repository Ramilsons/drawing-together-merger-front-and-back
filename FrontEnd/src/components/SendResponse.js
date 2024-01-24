import { useState } from "react";
import socket from "../socket";

import sendIcon from './../images/send-icon.png'

export default function SendResponse(props) {
    const [userResponse, setUserResponse] = useState('');

    function verifyResponse() {
        socket.emit('answer', userResponse.toLowerCase());

        if(userResponse.toLowerCase() === props.correctResponse.toLowerCase()) {
            props.state(true);
        } else {
            props.state(false);
        }
    }

    function newResponse(e) {
        setUserResponse(e.target.value);
    }

    return (
        <div className={'absolute bottom-0 h-[60px] w-[100%] border-t-2 p-3 flex items-center justify-between'}>
            <input className={'border-b-2 w-[250px]  h-[40px] focus:outline-none'} placeholder="Escreva aqui..." type="text" onChange={(e) => { newResponse(e) }}></input>
            <button className={'border-2 rounded-xl w-[50px] h-[40px] flex items-center justify-center'} type="button" onClick={verifyResponse} aria-label="Enviar palavra">
                <img src={sendIcon} loading="lazy" alt="Avião de papel" width={35} height={35} />
            </button>
        </div>
    );
}
