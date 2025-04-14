import React from "react";
import Header from "../../../components/Header/Header";
import QuemSomos from "../../../components/QuemSomos/QuemSomos";
import Hero from "../../../components/hero/Hero";

function Home(){
    return (
        <div>
            <Header />
            <Hero />
            <QuemSomos />
        </div>
    )
}

export default Home