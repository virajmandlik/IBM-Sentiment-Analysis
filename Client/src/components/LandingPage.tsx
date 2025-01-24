import React from "react";
import { About } from "./About";
import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Testimonials } from "./Testimonials";
import { RetroGridBackground } from "./RetroGridBackground";
import ScratchToRevealDemo from "./ScratchToRevealDemo";
import {Users} from "./Users"
const LandingPage: React.FC = () => {
  return (
    <>  
      <Navbar />
      <Hero />
      <Users/>
      <Features />
      <RetroGridBackground>
        <ScratchToRevealDemo />
      </RetroGridBackground>
      <Testimonials />
      <FAQ />
    </>
  );
};

export default LandingPage;
