
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Portfolio</h3>
            <p className="text-muted-foreground">Building modern web experiences</p>
          </div>
          
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#resume" className="hover:text-primary transition-colors">Resume</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="text-muted-foreground text-sm">
            &copy; {currentYear} Your Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
