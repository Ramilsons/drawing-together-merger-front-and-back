import { useContext } from "react";

import { GlobalData } from "../App";

import SendResponse from "./../components/SendResponse";
import Historic from "./../components/Historic";

import microphoneImage from "./../images/microphone.webp";

export default function HistoricWrapper() {
    const { isMyTurn, wordGenerated } = useContext(GlobalData);

    return (
        <div className={`borderOutsideEffect rotate-3 w-[330px]`}>
            <img className="absolute top-[-80px] right-[-20px] z-10" width={140} height={140} alt="Megafone" src={microphoneImage} />

            <div className={`rotate-[-3deg] bg-[#fff] h-[500px] w-[330px]`}>
                <div className={'py-5 px-4'}>
                    <Historic />
                </div>
                { !isMyTurn && wordGenerated.length > 0 ? <SendResponse /> : '' }
            </div>
        </div>
    );
}