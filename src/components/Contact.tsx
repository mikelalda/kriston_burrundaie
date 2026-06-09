/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, MessageSquare, Send, CheckSquare, Sparkles } from 'lucide-react';

interface LocalMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  time: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);

  useEffect(() => {
    // Check locally saved messages count
    const messages = localStorage.getItem('kriston_burrundaie_inbox');
    if (messages) {
      try {
        const parsed = JSON.parse(messages);
        setInboxCount(parsed.length);
      } catch (e) {}
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const newMessage: LocalMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      time: new Date().toLocaleTimeString(),
    };

    const existingJson = localStorage.getItem('kriston_burrundaie_inbox');
    let messagesList: LocalMessage[] = [];
    if (existingJson) {
      try {
        messagesList = JSON.parse(existingJson);
      } catch (err) {}
    }
    messagesList.push(newMessage);
    localStorage.setItem('kriston_burrundaie_inbox', JSON.stringify(messagesList));
    setInboxCount(messagesList.length);

    setMessageSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setMessageSubmitted(false);
    }, 4505);
  };

  return (
    <footer id="harremana" className="bg-[#f4f4f2] text-black pt-24 pb-12 border-t-4 border-black scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b-2 border-black">
          
          {/* Informational Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#ff3b30] font-mono text-xs uppercase tracking-widest block font-black">
              HARREMANA ETA SARETZE KOLABORATIBOA
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tighter uppercase text-black">
              Jarri Harremanetan
            </h2>
            <p className="text-zinc-850 text-base sm:text-lg leading-relaxed font-serif italic max-w-lg">
              Eragilea zara eta bat egin nahi duzu? Talderen baten parte zara eta hurrengorako burrunba honetan egon nahi duzu? Edo jaialdiari buruzko zalantzarik daukazu? Idatziguzu gure posta elektronikora edo bete zuzenean ondoko mezu kutxa!
            </p>

            {/* Email link showcase */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4 bg-white border-2 border-black p-4 max-w-sm shadow-[4px_4px_0px_#1a1a1a]">
                <Mail className="w-6 h-6 text-[#ff3b30]" />
                <div>
                  <p className="text-[10px] font-mono text-zinc-650 uppercase font-black">Gure Posta Ofiziala</p>
                  <a href="mailto:kriston.burrundaie@gmail.com" className="text-black hover:text-[#ff3b30] font-bold transition-colors text-sm font-mono">
                    kriston.burrundaie@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="space-y-3 pt-2">
              <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest font-black">Sare Sozial herrikoiak</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="p-3 bg-white hover:bg-zinc-50 border-2 border-black text-black hover:border-[#ff3b30] hover:text-[#ff3b30] transition-all shadow-[3px_3px_0px_#1a1a1a] active:translate-y-0.5 cursor-pointer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                {/* <a
                  href="https://mastodon.social"
                  target="_blank"
                  rel="noreferrer"
                  title="Mastodon"
                  className="px-4 py-3 bg-white hover:bg-zinc-50 border-2 border-black text-black hover:border-[#ff3b30] hover:text-[#ff3b30] transition-all font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center min-h-[46px] shadow-[3px_3px_0px_#1a1a1a] active:translate-y-0.5 cursor-pointer"
                >
                  Mastodon
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  title="X (Twitter)"
                  className="px-4 py-3 bg-white hover:bg-zinc-50 border-2 border-black text-black hover:border-[#ff3b30] hover:text-[#ff3b30] transition-all font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center min-h-[46px] shadow-[3px_3px_0px_#1a1a1a] active:translate-y-0.5 cursor-pointer"
                >
                  X / Twitter
                </a> */}
              </div>
            </div>
          </div>

          {/* Interactive feedback form column */}
          {/* <div className="lg:col-span-6 bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_#1a1a1a]">
            <h3 className="font-sans font-black uppercase text-xl text-black">
              Sartu Burrundaien!
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-black uppercase font-black">Nor zara? / Elkartea (*):</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Idatzi zure izena edo taldearena..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-2 border-black text-xs sm:text-sm px-3.5 py-2.5 text-black placeholder-zinc-400 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans mt-1"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-black uppercase font-black">E-posta helbidea (*):</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="zure_posta@posta.eus"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-2 border-black text-xs sm:text-sm px-3.5 py-2.5 text-black placeholder-zinc-400 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans mt-1"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-black uppercase font-black">Zure Mezua / Proposamena (*):</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Idatzi zure zarata aldarrikapena, kontzerturako prestasuna edo zalantzak..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border-2 border-black text-xs sm:text-sm px-3.5 py-2.5 text-black placeholder-zinc-400 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans mt-1"
                />
              </div>

              <div className="flex bg-zinc-100 px-3 py-2 border-2 border-black text-[10px] font-mono text-black justify-between items-center select-none font-black uppercase">
                <span>Herrialde Barneko Zerbitzaria: ONLINE</span>
                <span>Bidalitako Postak: {inboxCount}</span>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3 bg-[#ff3b30] hover:bg-[#e02b20] text-white font-sans font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 border-2 border-black shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>BIDALI MEZUA!</span>
              </button>
            </form>

            <AnimatePresence>
              {messageSubmitted && (
                <motion.div
                  id="contact-form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3 bg-white border-2 border-black border-l-8 border-l-[#22c55e] text-zinc-900 text-xs font-sans text-center font-bold"
                >
                  ✊ Eskerrik asko! Mezu herrikoia jaso dugu lokaleko zerbitzarian. Laster erantzungo dizugu!
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}

        </div>

        {/* Copyleft and Legal Section with Basque details */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-zinc-750 font-mono text-[10px] uppercase tracking-wider gap-4 font-black">
          <p className="flex items-center gap-1">
            <span>&copy; 2026 KRISTON BURRUNDAIE. Copyleft</span>
            <span className="text-sm select-none">🄲</span>
            <span>– Kultura Librea eta Autogestionatua.</span>
          </p>
          <div className="flex space-x-4">
            <span className="text-zinc-650">KALEETAN JAIOA</span>
            <span>●</span>
            <span className="text-zinc-650">ZARATAK BATZEN GAITU</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
