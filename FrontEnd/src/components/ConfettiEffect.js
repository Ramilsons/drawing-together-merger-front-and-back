import Confetti from 'react-confetti';

export default function ConfettiEffect() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
        <Confetti width={width} height={height} />    
    )
}