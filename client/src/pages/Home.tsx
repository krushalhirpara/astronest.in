import React, { useEffect } from 'react';
import { Hero } from "@/components/landing/Hero";
import { Zodiac } from "@/components/landing/Zodiac";
import { AIAstrologers } from "@/components/landing/AIAstrologers";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Celebrities } from "@/components/landing/Celebrities";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";

const Home = () => {
  useEffect(() => {
    document.title = "AstroNest - Home";
  }, []);

  return (
    <>
      <Hero />
      <Zodiac />
      <AIAstrologers />
      <HowItWorks />
      <Features />
      <Pricing />
      <Celebrities />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
