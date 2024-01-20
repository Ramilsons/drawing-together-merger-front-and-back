import { useState } from "react";
import socket from "../socket";

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
        <div>
            <input placeholder="Escreva aqui..." type="text" onChange={(e) => { newResponse(e) }}></input>
            <button type="button" onClick={verifyResponse} >{'Verificar'}</button>
        </div>
    );
}
