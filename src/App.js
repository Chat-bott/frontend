import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="home" className="min-h-screen py-20 px-5 max-w-7xl mx-auto">
          <Home />
        </section>
        <section id="about" className="min-h-screen py-20 px-5 max-w-7xl mx-auto">
          <About />
        </section>
        <section id="projects" className="min-h-screen py-20 px-5 max-w-7xl mx-auto">
          <Projects />
        </section>
        <section id="contact" className="min-h-screen py-20 px-5 max-w-7xl mx-auto">
          <Contact />
        </section>
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
