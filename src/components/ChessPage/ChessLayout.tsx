import OpeningChart from "./OpeningChart";
import Chesschart from "./Chesschart";

export default function ChessLayout(){

    return(
        <>
        <div class="grid grid-cols-8 col-span-8 w-full h-full row-span-5 bg-slate-500 rounded-xl">
            <OpeningChart />
            <Chesschart />
        </div>
           
        </>
        )
}
   
