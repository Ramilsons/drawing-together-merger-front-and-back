import { useContext } from "react";
import { GlobalData } from "../App";

import { ReactP5Wrapper } from "react-p5-wrapper";

import { sketch } from "./../sketch";

import trophyImage from "./../images/trophy.webp";

export default function DrawWrapper() {
    const {coordsMouseMoved, isMyTurn, isBreakTime} = useContext(GlobalData);

    return (
        <>
            <div className={`borderOutsideEffect rotate-[-3deg] w-[530px] xl:w-[750px]`}>
                <div className={`rotate-[3deg]`}>
                    <ReactP5Wrapper sketch={sketch} coords={coordsMouseMoved} isMyTurn={isMyTurn} isBreakTime={isBreakTime} />
                </div>
            </div>
            <img className="absolute bottom-[-50px] left-[-80px]" width={140} height={140} alt="Troféu" src={trophyImage} /> 
        </>
    )
}