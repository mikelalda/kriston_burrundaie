/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Flame, Radical } from 'lucide-react';
import logoImg from '../assets/images/kriston_burrundaie_logo.png'

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Hasiera', id: 'hero' },
    { name: 'Manifestua', id: 'manifestua' },
    { name: 'Egitaraua', id: 'egitaraua' },
    // { name: 'Auzolana & Txandak', id: 'auzolana' },
    { name: 'Harremana', id: 'harremana' },
  ];

  const handleItemClick = (id: string) => {
    if (isOpen) {
      // Close the mobile panel first so it doesn't cover the target
      // section while the page scrolls to it.
      setIsOpen(false);
      setTimeout(() => onNavClick(id), 150);
    } else {
      onNavClick(id);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-black ${
        scrolled
          ? 'bg-white py-3 shadow-md'
          : 'bg-white/95 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleItemClick('hero')}
            className="flex items-center space-x-2 group cursor-pointer focus:outline-none"
          >
            <div className="bg-[#ff3b30] text-black p-1.5 rounded-none font-black flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-200 shadow-[2px_2px_0px_#1a1a1a] border border-black">
              <Flame className="w-5 h-5 fill-black text-black" />
            </div>
            <span className="font-sans font-black tracking-tighter text-lg text-black group-hover:text-[#ff3b30] transition-colors uppercase">
              Kriston <span className="text-[#ff3b30]">Burrundaie</span>
            </span>
            
            {/* <img
              src={logoImg}
              alt="Kriston Burrundaie"
              className="h-10 w-auto"
            /> */}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-sans font-black uppercase tracking-widest transition-all focus:outline-none cursor-pointer border ${
                    isActive
                      ? 'text-white bg-[#ff3b30] border-black shadow-[3px_3px_0px_rgba(26,26,26,1)]'
                      : 'text-[#1a1a1a] border-transparent hover:border-black hover:bg-[#e4e4e0]'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
            
            {/* Quick Action Button */}
            {/* <button
              id="nav-quick-action"
              onClick={() => handleItemClick('auzolana')}
              className="ml-4 px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black hover:bg-[#ff3b30] hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none cursor-pointer shadow-[3px_3px_0px_#ff3b30]"
            >
              Apuntatu Txandan!
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none text-black hover:bg-zinc-150 focus:outline-none border-2 border-black"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b-2 border-black"
          >
            <div className="px-2 pt-2 pb-5 space-y-1 sm:px-3 text-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full px-4 py-3 text-sm font-sans font-black uppercase tracking-wider transition-colors border-l-4 ${
                      isActive
                        ? 'bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]'
                        : 'text-zinc-750 hover:text-black hover:bg-zinc-100 border-transparent'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
              <div className="px-4 pt-3">
                <button
                  id="mobile-nav-quick-action"
                  onClick={() => handleItemClick('auzolana')}
                  className="w-full py-3 bg-black text-white font-black uppercase tracking-widest hover:bg-[#ff3b30] transition-colors shadow-[4px_4px_0px_#ff3b30] border-2 border-black text-xs"
                >
                  ⚡ Sartu Auzolanean! ⚡
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
