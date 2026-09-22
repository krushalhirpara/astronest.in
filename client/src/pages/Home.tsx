import React from 'react';
import { Hero } from "@/components/landing/Hero";
import { Zodiac } from "@/components/landing/Zodiac";
import { AIAstrologers } from "@/components/landing/AIAstrologers";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Celebrities } from "@/components/landing/Celebrities";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Seo } from "@/seo/Seo";
import { pageSeoConfig } from "@/seo/seoConfig";
import { getOrganizationSchema, getWebSiteSchema } from "@/seo/structuredData";

const Home = () => {
  const structuredData = [
    getOrganizationSchema(),
    getWebSiteSchema()
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.home.title}
        description={pageSeoConfig.home.description}
        canonical={pageSeoConfig.home.canonical}
        structuredData={structuredData}
      />
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
