import DrawWrapper from "./DrawWrapper";
import HistoricWrapper from "./HistoricWrapper";

export default function DrawSpaceAndHistoricContainer() {
   
    return (
        <div className={'flex items-end justify-between'}>
            <div className={`relative`}>
                <DrawWrapper />
            </div>

            <HistoricWrapper />
        </div>
    )
}