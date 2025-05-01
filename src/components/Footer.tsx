
import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Vibhu Kumar</h3>
            <p className="text-muted-foreground">Senior Product Manager</p>
          </div>
          
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#resume" className="hover:text-primary transition-colors">Resume</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="mailto:vibhu.kumar@tum.de" className="hover:text-primary transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com/in/vibhukumar" className="hover:text-primary transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-muted-foreground text-sm">
          &copy; {currentYear} Vibhu Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
