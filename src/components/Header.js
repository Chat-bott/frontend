import React from 'react';

function Header({ activeSection, setActiveSection }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-[1000]">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Portfolio</div>
        <nav className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeSection === 'home' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeSection === 'about' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeSection === 'projects' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeSection === 'contact' 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
