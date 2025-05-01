
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-sm backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold">
          Portfolio
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#resume" className="nav-link">Resume</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <button onClick={toggleMenu} className="md:hidden p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background p-4 shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#home" className="nav-link" onClick={toggleMenu}>Home</a>
            <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
            <a href="#portfolio" className="nav-link" onClick={toggleMenu}>Portfolio</a>
            <a href="#resume" className="nav-link" onClick={toggleMenu}>Resume</a>
            <a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
