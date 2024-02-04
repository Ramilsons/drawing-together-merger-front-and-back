import pencilAnimation from './../images/pencil-animation.webp';

export default function AnimatedPencil() {
    return (
        <div className={`relative h-16 w-16 animate-jump-pencil`}>
            <img className={`rotate-[271deg]`} src={pencilAnimation} height={100} width={200} alt="Lápis cor verde" />
        </div>
    )
}