import { useEffect, useState } from "react";
import socket from "../socket";

export default function Historic(props) {
    const [allAnswers, setAllAnswers] = useState([]);

    useEffect(() => {
        socket.connect();

        socket.on('newResponseOnHistoric', (data) => {
            setAllAnswers(data);
        })
    }, [socket]);

    return (
        allAnswers.map((value, index) => { 
            if(props.correctResponse.toLowerCase() == value.toLowerCase()) {
                setTimeout(() => {
                    setAllAnswers([]);

                    socket.emit('clearAllHistoricResponse');
                }, 4000);
            }

            return (
                <p className={`${props.correctResponse.toLowerCase() == value.toLowerCase() ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={'text-gray-400 font-semibold mr-1'}>
                        {props.isMyTurn ? `Oponente: ` : `Eu: `}
                    </span>
                    {value}
                </p>
            );
        })
    )
}