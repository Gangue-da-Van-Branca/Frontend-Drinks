import React from "react";
import TopoOpcionais from "../../../components/OpcionaisPage/TopoOpcionais/TopoOpcionais";
import BaresOpcionais from "../../../components/OpcionaisPage/BaresOpcionais/BaresOpcionais";
import "./Opcionais.css";

function Opcionais(){
    return(
        <div>
            <TopoOpcionais />
            <BaresOpcionais />
        </div>
    )
}

export default Opcionais;