export default function MessageBreakTime(props) {
    return(
        <>
            <p className={`text-center text-[#fff] text-3xl`}>
                Agora é sua vez de
                <strong className={`text-[#e5bf24]`}>{!props.isMyTurn ? ' Desenhar' : ' Acertar o desenho'}</strong>
            </p>
        </>
    );
}