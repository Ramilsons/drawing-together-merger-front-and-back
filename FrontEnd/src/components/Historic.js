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
        allAnswers.map((value, index) => <p className={`${props.correctResponse.toLowerCase() === value.toLowerCase ? 'text-green-500' : 'text-red-500'}`}>{value}</p>)
    )
}