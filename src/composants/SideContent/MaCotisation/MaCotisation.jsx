import History from "./History";
import Payments from "./Payment";

const MaCotisation = () => {
    return (
        <>
        <div className="grid md:grid-cols-2 md:p-16 h-auto w-auto">
            <div>
                
                <Payments/>
            </div>
            <div> 
                <History/>
            </div>

        </div>
        </>
    )
}

export default MaCotisation;