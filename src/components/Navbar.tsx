import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/services/analytics';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold">
          Vibhu Kumar
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <a href="#home" className="nav-link hover:text-primary" onClick={() => trackEvent('nav_click', { section: 'home' })}>Home</a>
          <a href="#about" className="nav-link hover:text-primary" onClick={() => trackEvent('nav_click', { section: 'about' })}>About</a>
          <a href="#experience" className="nav-link hover:text-primary" onClick={() => trackEvent('nav_click', { section: 'experience' })}>Experience</a>
          <a href="#projects" className="nav-link hover:text-primary" onClick={() => trackEvent('nav_click', { section: 'projects' })}>Projects</a>
          <a href="#contact" className="nav-link hover:text-primary" onClick={() => trackEvent('nav_click', { section: 'contact' })}>Contact</a>
        </div>

        <button onClick={toggleMenu} className="md:hidden p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background p-4 shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#home" className="nav-link hover:text-primary" onClick={() => { trackEvent('nav_click', { section: 'home', type: 'mobile' }); closeMenu(); }}>Home</a>
            <a href="#about" className="nav-link hover:text-primary" onClick={() => { trackEvent('nav_click', { section: 'about', type: 'mobile' }); closeMenu(); }}>About</a>
            <a href="#experience" className="nav-link hover:text-primary" onClick={() => { trackEvent('nav_click', { section: 'experience', type: 'mobile' }); closeMenu(); }}>Experience</a>
            <a href="#projects" className="nav-link hover:text-primary" onClick={() => { trackEvent('nav_click', { section: 'projects', type: 'mobile' }); closeMenu(); }}>Projects</a>
            <a href="#contact" className="nav-link hover:text-primary" onClick={() => { trackEvent('nav_click', { section: 'contact', type: 'mobile' }); closeMenu(); }}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
