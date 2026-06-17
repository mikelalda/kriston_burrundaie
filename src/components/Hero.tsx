/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Volume2, Flame, Sparkles } from 'lucide-react';
import { FESTIVAL_DATE, FESTIVAL_LOCATION } from '../data';
import bannerImg from '../assets/images/kriston_burrundaie_banner_1780928499913.jpg'
import logoImg from '../assets/images/kriston_burrundaie_logo.png'

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    egunak: 0,
    orduak: 0,
    minutuak: 0,
    segundoak: 0,
  });

  // Noise score states for the interactive "Zarata" meter
  const [noiseLevel, setNoiseLevel] = useState(85);
  const [multiplier, setMultiplier] = useState(1);
  const [clicksCount, setClicksCount] = useState(0);

  useEffect(() => {
    // Calculate countdown to 2026-09-19 12:00:00 (Festival start)
    const targetDate = new Date('2026-09-19T12:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ egunak: 0, orduak: 0, minutuak: 0, segundoak: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ egunak: d, orduak: h, minutuak: m, segundoak: s });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Naturally decays the noise level over time
  useEffect(() => {
    const decay = setInterval(() => {
      setNoiseLevel((prev) => (prev > 50 ? prev - 1 : 52));
    }, 1500);
    return () => clearInterval(decay);
  }, []);

  const handleMakeBurrunda = () => {
    setNoiseLevel((prev) => Math.min(prev + 6, 120));
    setClicksCount((prev) => prev + 1);
    if (clicksCount > 0 && clicksCount % 10 === 0) {
      setMultiplier((prev) => Math.min(prev + 1, 5));
    }
  };

  const getNoiseStatus = (lvl: number) => {
    if (lvl > 110) return { label: 'BURRUNDA BIZIA ✊', color: 'text-rose-500 animate-pulse' };
    if (lvl > 95) return { label: 'ZARATA IZUGARRIA ⚡', color: 'text-red-500' };
    if (lvl > 80) return { label: 'HASI DA SOUNUA 🔥', color: 'text-orange-500' };
    if (lvl > 65) return { label: 'SOINUA HASTEAR DA 🎶', color: 'text-yellow-500' };
    return { label: 'ISILTASUN LASAIA 🔇', color: 'text-zinc-500' };
  };

  const noiseStatus = getNoiseStatus(noiseLevel);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#f4f4f2] text-[#1a1a1a] flex flex-col justify-center pt-28 pb-16 overflow-hidden md:px-0"
    >
      {/* Dynamic Background Noise Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,59,48,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Tagline Badge */}
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center space-x-2 bg-[#ff3b30] text-white px-3.5 py-1.5 border-2 border-black text-xs font-mono uppercase tracking-widest font-black shadow-[2px_2px_0px_#1a1a1a]"
            >
              <Flame className="w-4 h-4 animate-bounce fill-white" />
              <span>Gure kaleak, gure zarata!</span>
            </motion.div> */}

            {/* Main Title - Punk Poster Styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1>
                <img
                  src={logoImg}
                  alt="Kriston Burrundaie"
                  className="w-full max-w-2xl"
                />
              </h1>
              <p className="text-lg sm:text-xl font-black text-[#ff3b30] uppercase tracking-wide">
                Kale kontzertuen festa herrikoia eta autogestionatua.
              </p>
            </motion.div>

            {/* Slogan & Mission sentence */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#2d2d2d] text-sm sm:text-base leading-relaxed max-w-xl font-sans font-medium"
            >
              Kalea gurea delako: zarata, elkarlana eta erresistentzia kulturala. Espazio publikoaren monopolio bribatu zein instituzionalaren aurka, herriko musika taldeak kalera aterako gara oztopo tekniko zein burokratiko guztien gainetik!
            </motion.p>

            {/* Metadata badges for Time & Location */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <div className="flex items-center space-x-3 bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#ff3b30]">
                <Calendar className="w-5 h-5 text-[#ff3b30] shrink-0" />
                <div>
                  <p className="text-zinc-650 font-mono text-[10px] uppercase tracking-widest font-black">DATA DEITUTAKOA</p>
                  <p className="text-black font-black text-sm">{FESTIVAL_DATE}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#1a1a1a]">
                <MapPin className="w-5 h-5 text-[#1a1a1a] shrink-0" />
                <div>
                  <p className="text-zinc-650 font-mono text-[10px] uppercase tracking-widest font-black">LEKUA ETA ESPAZIOA</p>
                  <p className="text-black font-black text-sm">{FESTIVAL_LOCATION}</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#ff3b30] hover:bg-[#e02b20] text-white text-sm font-black uppercase tracking-widest transition-all border-2 border-black shadow-[4px_4px_0px_#1a1a1a] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                Ikusi Egitaraua 🔥
              </button>
              <button
                id="hero-manifesto-btn"
                onClick={() => {
                  const el = document.getElementById('manifestua');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white text-black hover:bg-zinc-100 text-sm font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#1a1a1a] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                Gure Manifestua
              </button>
            </motion.div>

          </div>

          {/* Right Column: Poster showcase & Interactive Noise Meter */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            
            {/* Festival Poster Artwork Banner */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md relative bg-white border-4 border-black shadow-[8px_8px_0px_#ff3b30] overflow-hidden group aspect-[16/10]"
            >
              <img
                src={bannerImg}
                alt="Kriston Burrundaie Punk Banner"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 bg-[#ff3b30] border-2 border-black p-3">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest block font-bold">Kartel Ofiziala</span>
                <span className="text-xs text-white font-sans font-black uppercase tracking-wider">OKUPATU ESPAZIO PUBLIKOA SOINUZ</span>
              </div>
            </motion.div>

            {/* Countdown Clock Widget */}
            <div id="countdown-widget" className="w-full max-w-md bg-white border-2 border-black p-5 shadow-[6px_6px_0px_#1a1a1a] text-[#1a1a1a]">
              <h3 className="text-[#1a1a1a] font-mono text-xs uppercase tracking-widest text-center font-black mb-3">Burrundaie Hasteko Atzerako Kontaketa</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#f4f4f2] p-2.5 border-2 border-black">
                  <div className="text-2xl font-sans font-black text-black">{timeLeft.egunak}</div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase font-black">Egun</div>
                </div>
                <div className="bg-[#f4f4f2] p-2.5 border-2 border-black">
                  <div className="text-2xl font-sans font-black text-black">{timeLeft.orduak}</div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase font-black">Ordu</div>
                </div>
                <div className="bg-[#f4f4f2] p-2.5 border-2 border-black">
                  <div className="text-2xl font-sans font-black text-black">{timeLeft.minutuak}</div>
                  <div className="text-[10px] font-mono text-zinc-600 uppercase font-black">Min</div>
                </div>
                <div className="bg-[#f4f4f2] p-2.5 border-2 border-black">
                  <div className="text-2xl font-sans font-black text-[#ff3b30] animate-pulse">{timeLeft.segundoak}</div>
                  <div className="text-[10px] font-mono text-zinc-650 uppercase font-black">Seg</div>
                </div>
              </div>
            </div>

            {/* Interactive "Burrunda" street pressure button */}
            <div id="burrunda-interactor" className="w-full max-w-md bg-white border-2 border-black p-5 space-y-4 shadow-[6px_6px_0px_#1a1a1a] text-[#1a1a1a]">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-black uppercase tracking-wider">Burrunda neurgailua</h4>
                  <p className="text-xs text-zinc-600">Klikatu herriko burrundaie handitzeko!</p>
                </div>
                <span className="text-lg font-mono font-black text-black bg-[#f4f4f2] px-2.5 py-1 border-2 border-black">
                  {noiseLevel} <span className="text-xs text-zinc-500">dB</span>
                </span>
              </div>

              {/* Db Progress Indicator */}
              <div className="w-full h-4 bg-neutral-200 border-2 border-black p-0.5 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transition-all duration-300"
                  style={{ width: `${Math.min(((noiseLevel - 30) / (120 - 30)) * 100, 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs font-mono font-black uppercase tracking-wider ${noiseStatus.color}`}>
                  {noiseStatus.label}
                </span>
                <span className="text-zinc-600 font-mono text-[10px] font-black">Zaratameter: {clicksCount} klik</span>
              </div>

              <button
                id="make-noise-button"
                onClick={handleMakeBurrunda}
                className="w-full py-2.5 bg-black text-white hover:bg-[#ff3b30] text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 border-2 border-black shadow-[4px_4px_0px_#ff3b30] hover:shadow-[2px_2px_0px_#ff3b30] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                <span>EGIN BURRUNDA! ⚡</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
