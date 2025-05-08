import React from "react";
import TopoOpcionais from "../../../components/OpcionaisPage/TopoOpcionais/TopoOpcionais";
import BaresOpcionais from "../../../components/OpcionaisPage/BaresOpcionais/BaresOpcionais";
import ShotsOpcionais from "../../../components/OpcionaisPage/ShotsOpcionais/ShotsOpcionais";
import ExtrasOpcionais from "../../../components/OpcionaisPage/ExtrasOpcionais/ExtrasOpcionais";
import "./Opcionais.css";

function Opcionais(){
    return(
        <div>
            <TopoOpcionais />
            <BaresOpcionais />
            <ShotsOpcionais />
            <ExtrasOpcionais />
            
        </div>
    )
}

export default Opcionais;