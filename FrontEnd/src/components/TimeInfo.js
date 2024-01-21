import timerIcon from './../images/timer.webp';

export default function TimeInfo(props) {
    return (
        <div className="flex items-center gap-4">
            <img src={timerIcon} alt='Cronômetro' width={40} height={40} />

            <p className='text-[40px] font-semibold drop-shadow-xl'>60</p>
        </div>
    )
}