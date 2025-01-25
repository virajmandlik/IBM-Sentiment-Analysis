import React from "react";

import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Testimonials } from "./Testimonials";
import { RetroGridBackground } from "./RetroGridBackground";
import ScratchToRevealDemo from "./ScratchToRevealDemo";
import { TiltCardDemo } from "./TiltCardDemo";
import { Users } from "./Users";
import { HowItWorks } from "./HowItWorks";
import { Contact } from "./Contact";

const LandingPage: React.FC = () => {
  return (
    <>  
      <Navbar />
      <Hero />
      <Users />
      <Features />
      <RetroGridBackground>
        {/* Place the ScratchToRevealDemo and TiltCardDemo side by side */}
        <ScratchToRevealDemo />
        <TiltCardDemo />
      </RetroGridBackground>
      <HowItWorks />
      <Testimonials />
      <Contact />
      <FAQ />
    </>
  );
};

export default LandingPage;
