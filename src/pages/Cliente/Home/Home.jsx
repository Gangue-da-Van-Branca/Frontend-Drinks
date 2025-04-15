import React from "react";
import Header from "../../../components/Header/Header";
import QuemSomos from "../../../components/SecaoQuemSomos/QuemSomos";
import Hero from "../../../components/hero/Hero";
import ComoFunciona  from "../../../components/SecaoComoFunciona/ComoFunciona";
import SecaoEscolhaPacote from "../../../components/SecaoEscolhaPacote/SecaoEscolhaPacote";

function Home(){
    return (
        <div>
            <Header />
            <Hero />
            <QuemSomos />
            <ComoFunciona />
            <SecaoEscolhaPacote />
            
        </div>
    )
}

export default Home