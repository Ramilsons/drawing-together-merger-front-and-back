import { useEffect, useState, useContext } from "react";

import socket from "../socket";
import { GlobalData } from "../App";

export default function Historic() {
    const [allAnswers, setAllAnswers] = useState([]);
    const {isMyTurn, wordGenerated} = useContext(GlobalData);

    useEffect(() => {
        socket.connect();

        socket.on('newResponseOnHistoric', (data) => {
            setAllAnswers(data);
        })
    }, [socket]);

    return (
        allAnswers.map((value, index) => { 
            if(wordGenerated.toLowerCase() == value.toLowerCase()) {
                setTimeout(() => {
                    setAllAnswers([]);

                    socket.emit('clearAllHistoricResponse');
                }, 4000);
            }

            return (
                <p className={`${wordGenerated.toLowerCase() == value.toLowerCase() ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={'text-gray-400 font-semibold mr-1'}>
                        {isMyTurn ? `Oponente: ` : `Eu: `}
                    </span>
                    {value}
                </p>
            );
        })
    )
}