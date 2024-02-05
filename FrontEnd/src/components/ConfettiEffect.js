import Confetti from 'react-confetti';

export default function ConfettiEffect() {
    const width = window.screen.availWidth - 200;
    const height = window.screen.availHeight - 100;

    return (
        <Confetti width={width} height={height} />    
    )
}