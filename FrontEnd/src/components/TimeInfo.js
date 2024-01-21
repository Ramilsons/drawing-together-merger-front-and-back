import timerIcon from './../images/timer.webp';

export default function TimeInfo(props) {
    return (
        <div className="flex items-center">
            <img src={timerIcon} alt='Cronômetro' width={40} height={40} />
        </div>
    )
}