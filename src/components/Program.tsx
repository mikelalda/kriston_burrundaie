/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, Music, Clock, MapPin, ExternalLink, Play, Pause, Disc, Grid, List, Search } from 'lucide-react';
import { INITIAL_BANDS } from '../data';
import { Band } from '../types';

export default function Program() {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);
  
  // Audio state
  const [playingBandId, setPlayingBandId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [synthPlaying, setSynthPlaying] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const playbackTimerRef = useRef<number | null>(null);

  // Filter bands based on search
  const filteredBands = INITIAL_BANDS.filter((band) =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    band.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
    band.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple Synthesizer to make "Burrunda" noises during play preview
  const playPunkSynth = (frequency: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous synth
      stopPunkSynth();

      // Create rich distorted synth signal (Sawtooth + Triangle)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Multi-frequency dirty effect (punk rock style)
      // LFO modulation to simulate heavy guitars
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(8, ctx.currentTime); // 8Hz modulation
      lfoGain.gain.setValueAtTime(5, ctx.currentTime); // 5Hz deviation
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      lfo.start();
      osc.start();
      
      oscillatorRef.current = osc;
      gainRef.current = gain;
      setSynthPlaying(true);
    } catch (e) {
      console.warn("AudioContext failed or is blocked by browser policies.");
    }
  };

  const stopPunkSynth = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (err) {}
      oscillatorRef.current = null;
    }
    if (gainRef.current) {
      try {
        gainRef.current.disconnect();
      } catch (err) {}
      gainRef.current = null;
    }
    setSynthPlaying(false);
  };

  const handlePlayToggle = (band: Band) => {
    if (playingBandId === band.id) {
      // Pause
      setPlayingBandId(null);
      stopPunkSynth();
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    } else {
      // Play
      setPlayingBandId(band.id);
      setAudioProgress(0);
      
      // Determine frequency based on band style
      const freq = band.name === 'ZIKIN' ? 90 : 
                   band.name === 'BURRUNDA' ? 65 : 
                   band.name === 'HAUTSA' ? 120 : 100;
      
      playPunkSynth(freq);

      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }

      playbackTimerRef.current = window.setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setPlayingBandId(null);
            stopPunkSynth();
            if (playbackTimerRef.current) {
              clearInterval(playbackTimerRef.current);
            }
            return 0;
          }
          // Random frequency change to simulate guitar solos!
          if (oscillatorRef.current && Math.random() > 0.6) {
            const pitches = [65, 80, 90, 110, 130, 140, 180];
            const randomPitch = pitches[Math.floor(Math.random() * pitches.length)];
            oscillatorRef.current.frequency.setValueAtTime(randomPitch, audioContextRef.current!.currentTime);
          }
          return prev + 2;
        });
      }, 150);
    }
  };

  useEffect(() => {
    return () => {
      stopPunkSynth();
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, []);

  return (
    <section id="egitaraua" className="py-24 bg-[#f4f4f2] text-[#1a1a1a] scroll-mt-24 border-t-2 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Container */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b-2 border-black pb-8 mb-12">
          <div className="space-y-2">
            <span className="text-[#ff3b30] font-mono text-xs uppercase tracking-widest block font-black">
              ⚡ EGIAZKO ZARATA JAIALDIA
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tighter uppercase text-black">
              Zarata eta Ordutegiak
            </h2>
            <p className="text-[#2d2d2d] text-xs sm:text-sm max-w-xl font-sans font-medium leading-relaxed">
              Azpian daukazu gure herriko kaleetan barrena antolaketa autogestionatuan arituko diren taldeen zerrenda eta ordutegia. Klikatu bandaren gainean informazioa ikusteko, edo entzun beren punk-zarata doinu zuzenak!
            </p>
          </div>

          {/* View Mode Controls & Search */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-4">
            {/* Search Input bar */}
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Bilatu taldea, estiloa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-black placeholder-zinc-400 border-2 border-black text-xs px-4 py-2.5 pl-9 w-60 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-mono"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
            </div>

            {/* Toggle grid/timeline */}
            <div className="flex bg-[#e4e4e0] border-2 border-black p-0.5">
              <button
                id="toggle-view-grid"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-widest flex items-center space-x-1 focus:outline-none cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#ff3b30] text-white border border-black shadow-[1px_1px_0px_#000]' : 'text-[#1a1a1a] hover:bg-zinc-100/50'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kartelak</span>
              </button>
              <button
                id="toggle-view-timeline"
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-widest flex items-center space-x-1 focus:outline-none cursor-pointer ${
                  viewMode === 'timeline' ? 'bg-[#ff3b30] text-white border border-black shadow-[1px_1px_0px_#000]' : 'text-[#1a1a1a] hover:bg-zinc-100/50'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kronograma</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Playing Widget Alert */}
        {playingBandId && (
          <div className="mb-8 bg-white border-2 border-black border-l-8 border-l-[#ff3b30] p-4 flex items-center justify-between text-black shadow-[4px_4px_0px_#1a1a1a] animate-pulse">
            <div className="flex items-center space-x-3">
              <Disc className="w-6 h-6 text-[#ff3b30] animate-spin" />
              <div>
                <span className="text-[10px] font-mono text-[#ff3b30] uppercase font-black">ENTZULE SIMULAGAILU ZUZENA:</span>
                <p className="font-black text-xs uppercase tracking-wide">
                  {INITIAL_BANDS.find(b => b.id === playingBandId)?.name} taldearen zarata gailurra dabil!
                </p>
              </div>
            </div>
            <div className="w-24 bg-zinc-100 h-3 border-2 border-black rounded-none overflow-hidden relative">
              <div className="h-full bg-[#ff3b30]" style={{ width: `${audioProgress}%` }} />
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredBands.length === 0 && (
          <div className="text-center py-16 bg-white border-2 border-black shadow-[4px_4px_0px_#1a1a1a]">
            <p className="text-zinc-650 font-mono text-sm uppercase font-black">Ez da talderik aurkitu bilaketa horrekin.</p>
            <button
               id="clear-search-btn"
               onClick={() => setSearchTerm('')}
               className="mt-4 px-4 py-2 bg-[#ff3b30] text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Garbitu bilatzailea
            </button>
          </div>
        )}

        {/* View Mode Content */}
        {viewMode === 'grid' ? (
          /* Zine Card Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBands.map((band, idx) => {
              const isPlaying = playingBandId === band.id;
              return (
                <motion.div
                  id={`band-card-${band.id}`}
                  key={band.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true, margin: '-20px' }}
                  className="bg-white border-2 border-black flex flex-col justify-between relative group hover:border-black transition-all shadow-[6px_6px_0px_rgba(26,26,26,1)] hover:shadow-[10px_10px_0px_#ff3b30] overflow-hidden"
                >
                  {/* Badge details */}
                  <div className="absolute top-3 left-3 z-10 bg-black text-white px-2.5 py-1 text-xs font-mono font-black tracking-tight border border-black shadow-[2px_2px_0px_#ff3b30]">
                    {band.time}
                  </div>

                  {/* Top image visualizer */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b-2 border-black">
                    <img
                      src={band.image}
                      alt={band.name}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                    {/* Play Sample Button overlay */}
                    <button
                      id={`play-band-toggle-${band.id}`}
                      onClick={() => handlePlayToggle(band)}
                      className="absolute bottom-3 right-3 p-2 bg-black hover:bg-[#ff3b30] text-white shadow-[3px_3px_0px_#ff3b30] border border-black rounded-none focus:outline-none flex items-center space-x-1.5 text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-white" />
                          <span>GELDITU</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white text-white" />
                          <span>ENTZUN ⚡</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card Main Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-black">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-zinc-700 text-[10px] font-mono uppercase tracking-widest font-black">
                        <MapPin className="w-3 h-3 text-[#ff3b30]" />
                        <span>{band.location}</span>
                      </div>
                      <h3 className="text-2xl font-sans font-black tracking-tight text-black uppercase group-hover:text-[#ff3b30] transition-colors">
                        {band.name}
                      </h3>
                      <p className="text-[10px] font-black font-mono tracking-widest text-white bg-[#ff3b30] py-1 px-2.5 border border-black uppercase inline-block shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                        {band.style}
                      </p>
                      <p className="text-zinc-800 text-xs sm:text-sm leading-relaxed pt-2 font-sans italic font-medium">
                        "{band.desc}"
                      </p>
                    </div>

                    {/* Footer Social Actions */}
                    <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono">
                      <div className="flex space-x-4">
                        <a
                          href={band.bandcamp}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-600 hover:text-black hover:underline flex items-center space-x-1 font-black"
                        >
                          <span>Bandcamp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={band.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-600 hover:text-black hover:underline flex items-center space-x-1 font-black"
                        >
                          <span>Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <button
                        id={`view-details-${band.id}`}
                        onClick={() => setSelectedBand(band)}
                        className="text-[#ff3b30] hover:text-[#e02b20] text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        Ikusi gehiago &raquo;
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Timeline Chronological List View */
          <div className="max-w-3xl mx-auto relative border-l-4 border-black ml-4 md:ml-32 py-4 space-y-12">
            {filteredBands.map((band, idx) => {
              const isPlaying = playingBandId === band.id;
              return (
                <motion.div
                  id={`timeline-item-${band.id}`}
                  key={band.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="relative pl-8"
                >
                  {/* Timeline point dot */}
                  <div className="absolute -left-[10px] top-1.5 w-[16px] h-[16px] bg-white border-2 border-black rounded-none z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#ff3b30]" />
                  </div>

                  {/* Time box positioning absolute on left */}
                  <div className="hidden md:block absolute -left-36 top-1 w-24 text-right">
                    <span className="text-xl font-sans font-black text-[#ff3b30] block">{band.time}</span>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-black">ORDUTEGIA</span>
                  </div>

                  {/* Main horizontal block content */}
                  <div className="bg-white border-2 border-black p-6 flex flex-col md:flex-row gap-6 hover:border-black shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_#ff3b30] transition-all text-black">
                    
                    {/* Tiny representation image */}
                    <div className="w-full md:w-32 aspect-[4/3] shrink-0 bg-zinc-950 overflow-hidden relative border-2 border-black">
                      <img
                        src={band.image}
                        alt={band.name}
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-grow space-y-2">
                      <span className="text-[#ff3b30] font-mono text-xl font-black md:hidden mr-2 block">
                        {band.time} -
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-sans font-black text-black uppercase">{band.name}</h3>
                        <span className="bg-[#ff3b30] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                          {band.style}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-zinc-750 font-mono text-[10px] uppercase font-black">
                        <MapPin className="w-3 h-3 text-[#ff3b30] mr-1" />
                        <span>{band.location}</span>
                      </div>
                      <p className="text-zinc-800 text-xs sm:text-sm leading-relaxed pt-1 font-medium italic">
                        "{band.desc}"
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button
                          id={`timeline-play-toggle-${band.id}`}
                          onClick={() => handlePlayToggle(band)}
                          className="px-3 py-1 bg-black hover:bg-[#ff3b30] border-2 border-black text-white text-[10px] font-mono font-black uppercase tracking-widest flex items-center space-x-1 cursor-pointer shadow-[2px_2px_0px_#ff3b30]"
                        >
                          {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 fill-white text-white" />}
                          <span>{isPlaying ? 'GELDITU' : 'ENTZUN ERREPRODUKZIOA'}</span>
                        </button>
                        <a
                          href={band.bandcamp}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-600 hover:text-black text-[10px] font-mono uppercase flex items-center space-x-1 font-black"
                        >
                          <span>Bandcamp</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <a
                          href={band.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-650 hover:text-black text-[10px] font-mono uppercase flex items-center space-x-1 font-black"
                        >
                          <span>Instagram</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal Band Details */}
      {selectedBand && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(26,26,26,1)] max-w-2xl w-full p-6 md:p-8 relative text-black"
          >
            <button
              id="close-band-modal"
              onClick={() => setSelectedBand(null)}
              className="absolute top-4 right-4 text-[#ff3b30] hover:text-[#e02b20] font-sans text-xs uppercase font-black tracking-widest p-1 border-2 border-black px-2 py-1 bg-white hover:bg-zinc-50 cursor-pointer shadow-[2px_2px_0px_#000]"
            >
              [X] ITXI
            </button>
            <div className="space-y-6">
              <div className="aspect-[16/9] w-full bg-zinc-950 overflow-hidden border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <img
                  src={selectedBand.image}
                  alt={selectedBand.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-sans font-black text-[#ff3b30] block">{selectedBand.time} - {selectedBand.location}</span>
                </div>
                <h3 className="text-3xl font-sans font-black tracking-tight text-black uppercase">{selectedBand.name}</h3>
                <span className="bg-[#ff3b30] text-white text-xs font-mono font-black uppercase px-2 py-1 inline-block border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {selectedBand.style}
                </span>
                <p className="text-[#1a1a1a] text-sm leading-relaxed font-sans font-medium pt-2">
                  {selectedBand.desc}
                </p>
                <p className="text-zinc-650 text-xs font-sans font-medium">
                  Gure herriko kale askeak musika eta zaratarekin beteko ditugu. KRISTON BURRUNDAIE asmo komertzialik gabeko elkar saretze bat denez, talde hauek guztiek oinarrizko konpromiso eta minimalismoarekin bat egin dute. Lagundu diezagun jaialdia finantzatzen!
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
                <a
                  href={selectedBand.bandcamp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white text-black hover:bg-zinc-100 border-2 border-black text-xs font-black uppercase tracking-widest flex items-center space-x-1 shadow-[2px_2px_0px_rgba(26,26,26,1)]"
                >
                  <span>Bandcamp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={selectedBand.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#ff3b30] text-white hover:bg-[#e02b20] text-xs font-black uppercase tracking-widest flex items-center space-x-1 border-2 border-black shadow-[2px_2px_0px_rgba(26,26,26,1)]"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
