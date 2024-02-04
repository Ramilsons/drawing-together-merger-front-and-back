import AnimatedLine from "./AnimatedLine";
import AnimatedPencil from "./AnimatedPencil";

export default function AnimatedPencilAndLine() {
    return (
        <div className={`flex flex-col items-center`}>
            <AnimatedPencil />
            <AnimatedLine />
        </div>
    )
}