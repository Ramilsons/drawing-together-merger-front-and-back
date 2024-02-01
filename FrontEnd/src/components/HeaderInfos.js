import { GlobalData } from "../App";
import { useContext } from "react";

import TimeInfo from "./TimeInfo";
import WordInfo from "./WordInfo";

export default function HeaderInfos() {
    let { isMyTurn } = useContext(GlobalData);

    return (
        <div className={"flex items-center gap-28 mb-7 text-[#fff]"}>
            <TimeInfo />

            {isMyTurn ? <WordInfo /> : ''}
        </div>
    )
}