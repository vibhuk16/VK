
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
          Hi, I'm <span className="text-primary">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          I specialize in building modern, responsive web applications with clean, elegant designs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild className="btn-primary">
            <a href="#portfolio">
              View My Work <ArrowRight className="ml-2" size={16} />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
