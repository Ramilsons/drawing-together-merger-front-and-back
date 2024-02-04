export default function TimeBreakLoadingBar(props) {
    return (
        <div class={`relative w-[500px] bg-gray-200 rounded ${ props.isBreakTime ? 'timeBreakAnimation' : ''}`}>
            <div class="absolute top-0 h-4 rounded shim-red w-full"></div>
        </div>
    );
}