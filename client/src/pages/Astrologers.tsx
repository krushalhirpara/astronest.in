import React, { useEffect } from 'react';
import { AIAstrologers } from "@/components/landing/AIAstrologers";

const AstrologersPage = () => {
  useEffect(() => {
    document.title = "AstroNest - AI Astrologers";
  }, []);

  return (
    <div className="pt-20">
      <AIAstrologers />
    </div>
  );
};

export default AstrologersPage;
