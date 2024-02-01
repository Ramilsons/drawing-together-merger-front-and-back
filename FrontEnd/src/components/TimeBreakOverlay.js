export default function TimeBreakOverlay(props) {
    return (
        <div className={`absolute top-0 left-0 bg-gray-600 w-[100vw] h-[100vh] ${props.isBreakTime ? 'opacity-85 z-20' : 'opacity-0'}`}></div>
    );
}