import React from 'react';
import { AIAstrologers } from "@/components/landing/AIAstrologers";
import { Seo } from "@/seo/Seo";
import { pageSeoConfig } from "@/seo/seoConfig";
import { getBreadcrumbSchema } from "@/seo/structuredData";

const AstrologersPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Astrologers", url: "/astrologers" }
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.astrologers.title}
        description={pageSeoConfig.astrologers.description}
        canonical={pageSeoConfig.astrologers.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />
      <div className="pt-20">
        <AIAstrologers />
      </div>
    </>
  );
};

export default AstrologersPage;
