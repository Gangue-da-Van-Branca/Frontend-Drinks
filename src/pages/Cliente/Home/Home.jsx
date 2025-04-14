import React from "react";
import Header from "../../../components/Header/Header";
import QuemSomos from "../../../components/QuemSomos/QuemSomos";
import Hero from "../../../components/hero/Hero";
import ComoFunciona  from "../../../components/ComoFunciona/ComoFunciona";

function Home(){
    return (
        <div>
            <Header />
            <Hero />
            <QuemSomos />
            <ComoFunciona />
            
        </div>
    )
}

export default Home