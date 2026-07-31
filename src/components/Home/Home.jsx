import React from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Sub-components for each section of the page
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import TopDestinations from "./TopDestinations";
import FeaturesSection from "./FeaturesSection";
import CallToAction from "./CallToAction";

function Home(){
    return (
        <>
            <main>
                <HeroSection />
                <StatsSection />
                <TopDestinations />
                <FeaturesSection />
                <CallToAction />
            </main>
        </>
    )
}

export default Home;