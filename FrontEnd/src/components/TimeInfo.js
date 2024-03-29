import { useContext } from 'react';

import { GlobalData } from '../App';
import timerIcon from './../images/timer.webp';

export default function TimeInfo() {
    const { timer, confettiController } = useContext(GlobalData);

    return (
        <div className="flex items-center gap-4 w-[90px]">
            <img src={timerIcon} alt='Cronômetro' width={40} height={40} />

            <p className='text-[40px] font-semibold drop-shadow-xl'>{ confettiController ? '--' : timer}</p>
        </div>
    )
}