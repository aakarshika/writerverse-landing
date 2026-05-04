import React from 'react';
import './WriterverseLandingPage.css';
import LandingNav from '../features/writerverse-landing/LandingNav';
import WriterverseHeroSection from '../features/writerverse-landing/WriterverseHeroSection';
import TokenizedIntelligenceSection from '../features/writerverse-landing/TokenizedIntelligenceSection';
import NarrativeArcSection from '../features/writerverse-landing/NarrativeArcSection';
import EditorsCanvasSection from '../features/writerverse-landing/EditorsCanvasSection';
import LandingCtaSection from '../features/writerverse-landing/LandingCtaSection';
import LandingFooter from '../features/writerverse-landing/LandingFooter';

const WriterverseLandingPage = () => {
  return (
    <div className="writerverse-landing min-h-screen bg-[var(--wv-background)] text-[var(--wv-on-background)] font-[Inter,system-ui,sans-serif] selection:bg-[var(--wv-primary-container)] selection:text-[var(--wv-on-primary-container)]">
      <LandingNav />

      <main>
        <WriterverseHeroSection />
        <TokenizedIntelligenceSection />
        <NarrativeArcSection />
        <EditorsCanvasSection />
        <LandingCtaSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default WriterverseLandingPage;
