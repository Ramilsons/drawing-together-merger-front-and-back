import TimeInfo from "./TimeInfo";
import WordInfo from "./WordInfo";

export default function HeaderInfos(props) {
    return (
        <div className={"flex items-center gap-28 mb-7 text-[#fff]"}>
            <TimeInfo timer={props.timer} />

            {props.isMyTurn ? <WordInfo word={props.wordGenerated} /> : ''}
        </div>
    )
}