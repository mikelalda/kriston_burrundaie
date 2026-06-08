/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Program from './components/Program';
import PreProgram from './components/PreProgram';
import Auzolana from './components/Auzolana';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position to update active nav section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'manifestua', 'egitaraua', 'auzolana', 'harremana'];
      const scrollPos = window.scrollY + 150; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f4f4f2] font-sans text-[#1a1a1a] min-h-screen selection:bg-[#ff3b30] selection:text-white">
      {/* Navbar Menu */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Main Sections */}
      <main>
        {/* Hasiera (Hero Section) */}
        <Hero onExploreClick={() => handleNavClick('egitaraua')} />

        {/* Manifestua (The Core Ideology) */}
        <Manifesto />

        {/* Egitaraua (The Bands & Program Schedule) */}
        <PreProgram />

        {/* Auzolana (Active Shifts System & Volunteer Form) */}
        {/* <Auzolana /> */}
      </main>

      {/* Harremana (Footer & Dynamic Mailbox) */}
      <Contact />
    </div>
  );
}
