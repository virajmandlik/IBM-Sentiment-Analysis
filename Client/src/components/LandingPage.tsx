import React from 'react';
import { About } from './About';
import { Cta } from './Cta';
import { FAQ } from './FAQ';
import { Features } from './Features';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Navbar } from './Navbar';
import { Contact } from './Contact';
// import { Pricing } from './Pricing';
import { ScrollToTop } from './ScrollToTop';
// import { Services } from './Services';
import { Users } from './Users';
import { Team } from './Team';
import { Testimonials } from './Testimonials';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Users />
      <About />
      <HowItWorks />
      <Features />
      {/* <Services />   */}
      {/* <Cta /> */}
      <Testimonials />
      <Team />
      {/* <Pricing /> */}
      <Contact />
      <FAQ />
      {/* <Footer /> */}
      <ScrollToTop />
    </>
  );
};

export default LandingPage;
