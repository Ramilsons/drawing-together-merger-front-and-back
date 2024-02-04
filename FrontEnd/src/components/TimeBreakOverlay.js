import AnimatedPencilAndLine from "./AnimatedPencilAndLine";
import TimeBreakLoadingBar from "./TimeBreakLoadingBar";
import MessageBreakTime from "./MessageBreakTime";

export default function TimeBreakOverlay(props) {
    return (
        <div className={`absolute top-0 left-0 flex items-center justify-center bg-gray-700 w-[100vw] min-h-[100vh] ${props.isBreakTime ? 'opacity-85 z-20' : 'opacity-0'}`}>
            <div className={`flex flex-col gap-20`}>
                <div className={`flex flex-col items-center`}>
                    <AnimatedPencilAndLine />
                </div>

                <TimeBreakLoadingBar isBreakTime={props.isBreakTime} />

                <MessageBreakTime isMyTurn={props.isMyTurn} />
            </div>
        </div>
    );
}