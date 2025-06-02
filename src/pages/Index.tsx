import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { trackPageView } from '@/services/analytics';

const Index = () => {
  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
