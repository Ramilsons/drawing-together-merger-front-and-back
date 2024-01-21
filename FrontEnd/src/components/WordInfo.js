import pencilIcon from './../images/pencil.webp';

export default function WordInfo(props) {
    return (
        <div className="flex items-center gap-4">
            <img src={pencilIcon} alt='Lápis' width={40} height={40} />

            <p className='text-[40px] font-semibold drop-shadow-xl'>{props.word}</p>
        </div>
    )
}