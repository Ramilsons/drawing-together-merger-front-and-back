import { useContext } from 'react';

import { GlobalData } from '../App';
import pencilIcon from './../images/pencil.webp';

export default function WordInfo(props) {
    const { wordGenerated } = useContext(GlobalData);

    return (
        <div className="flex items-center gap-4">
            <img src={pencilIcon} alt='Lápis' width={40} height={40} />

            <p className='text-[40px] font-semibold drop-shadow-xl'>{wordGenerated}</p>
        </div>
    )
}