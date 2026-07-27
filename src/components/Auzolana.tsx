/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Pocket as Beer, Trash2, Settings, Speaker, PenTool, CheckCircle, Flame, Sparkles, Clock } from 'lucide-react';
import { INITIAL_SHIFTS } from '../data';
import { Shift, ShiftRole } from '../types';

export default function Auzolana() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<ShiftRole | 'All'>('All');
  
  // Registration Dialog modal
  const [selectedShiftForSignUp, setSelectedShiftForSignUp] = useState<Shift | null>(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  
  // General Shift Signup Form Modal
  const [isGeneralFormOpen, setIsGeneralFormOpen] = useState(false);
  const [generalFormData, setGeneralFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Txosna' as ShiftRole,
    timePreference: '',
    comments: '',
  });
  
  const [isSuccessAlert, setIsSuccessAlert] = useState<string | null>(null);

  // Initialize from LocalStorage or Default presets
  useEffect(() => {
    const saved = localStorage.getItem('kriston_burrundaie_shifts');
    if (saved) {
      try {
        setShifts(JSON.parse(saved));
      } catch (e) {
        setShifts(INITIAL_SHIFTS);
      }
    } else {
      setShifts(INITIAL_SHIFTS);
    }
  }, []);

  const saveShifts = (updated: Shift[]) => {
    setShifts(updated);
    localStorage.setItem('kriston_burrundaie_shifts', JSON.stringify(updated));
  };

  // Sign up directly to a specific shift position
  const handleSignUpConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShiftForSignUp || !volunteerName.trim()) return;

    const updated = shifts.map((s) => {
      if (s.id === selectedShiftForSignUp.id) {
        // Prevent duplicate registration in the same shift
        if (s.volunteers.includes(volunteerName.trim())) {
          return s;
        }
        return {
          ...s,
          volunteers: [...s.volunteers, volunteerName.trim()],
        };
      }
      return s;
    });

    saveShifts(updated);
    setIsSuccessAlert(`Eskerrik asko, ${volunteerName}! Txandara zuzen apuntatu zara.`);
    setSelectedShiftForSignUp(null);
    setVolunteerName('');
    setVolunteerPhone('');

    setTimeout(() => {
      setIsSuccessAlert(null);
    }, 4500);
  };

  // Unregister name from shift slot (empower users to self-correct!)
  const handleUnregister = (shiftId: string, name: string) => {
    const updated = shifts.map((s) => {
      if (s.id === shiftId) {
        return {
          ...s,
          volunteers: s.volunteers.filter((v) => v !== name),
        };
      }
      return s;
    });
    saveShifts(updated);
  };

  // Submit the general inquiry volunteering form
  const handleGeneralFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalFormData.name.trim() || !generalFormData.email.trim()) return;

    // Simulate appending to shifts if matches
    const matchingShift = shifts.find(
      (s) => s.role === generalFormData.role && s.volunteers.length < s.needed
    );

    let updatedShifts = [...shifts];
    if (matchingShift) {
      updatedShifts = shifts.map((s) => {
        if (s.id === matchingShift.id) {
          return {
            ...s,
            volunteers: [...s.volunteers, generalFormData.name.trim()],
          };
        }
        return s;
      });
      saveShifts(updatedShifts);
    }

    setIsSuccessAlert(`Formularioa bidali da! Eskerrik asko talde saretzean sartzeagatik, ${generalFormData.name}!`);
    setIsGeneralFormOpen(false);
    
    // Reset general form
    setGeneralFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Txosna',
      timePreference: '',
      comments: '',
    });

    setTimeout(() => {
      setIsSuccessAlert(null);
    }, 4500);
  };

  const rolesList: ShiftRole[] = ['Txosna', 'Garbiketa', 'Muntaia', 'Desmuntaia', 'Soinua & Argiak'];

  const getRoleIcon = (role: ShiftRole) => {
    switch (role) {
      case 'Txosna': return <Beer className="w-5 h-5 text-yellow-500" />;
      case 'Garbiketa': return <Trash2 className="w-5 h-5 text-green-500" />;
      case 'Muntaia': return <PenTool className="w-5 h-5 text-blue-500" />;
      case 'Desmuntaia': return <Settings className="w-5 h-5 text-orange-500" />;
      case 'Soinua & Argiak': return <Speaker className="w-5 h-5 text-red-500" />;
    }
  };

  const getRoleColorClass = (role: ShiftRole) => {
    switch (role) {
      case 'Txosna': return 'border-amber-400 text-amber-800 bg-amber-50';
      case 'Garbiketa': return 'border-emerald-400 text-emerald-800 bg-emerald-50';
      case 'Muntaia': return 'border-blue-400 text-blue-800 bg-blue-50';
      case 'Desmuntaia': return 'border-orange-400 text-orange-850 bg-orange-50';
      case 'Soinua & Argiak': return 'border-red-400 text-red-800 bg-red-50';
    }
  };

  const filteredShifts = selectedRoleFilter === 'All'
    ? shifts
    : shifts.filter((s) => s.role === selectedRoleFilter);

  // Total statistics for satisfaction review!
  const totalVolunteersNeeded = shifts.reduce((acc, s) => acc + s.needed, 0);
  const totalRegistered = shifts.reduce((acc, s) => acc + s.volunteers.length, 0);
  const overallCoveragePercent = totalVolunteersNeeded > 0
    ? Math.round((totalRegistered / totalVolunteersNeeded) * 100)
    : 0;

  return (
    <section id="auzolana" className="py-24 bg-white w-full border-t-2 border-b-2 border-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Alert Toast */}
        <AnimatePresence>
          {isSuccessAlert && (
            <motion.div
              id="auzolana-toast-alert"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed bottom-5 right-5 z-50 bg-[#ff3b30] border-2 border-black text-white px-5 py-4 flex items-center space-x-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] max-w-sm rounded-none"
            >
              <CheckCircle className="w-6 h-6 shrink-0 text-white" />
              <div>
                <p className="font-black text-xs uppercase tracking-wider">PROZESUA BURUTUA!</p>
                <p className="text-xs text-white font-sans">{isSuccessAlert}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-black">
            <span className="text-[#ff3b30] font-mono text-xs uppercase tracking-widest block font-black">
              ✊ AUZOLANA ETA INDAR BATERATUA
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-black uppercase leading-none">
              Jaialdia Gu Garelako: <br />
              <span className="text-white bg-[#ff3b30] border-2 border-black inline-block px-3 py-1 transform rotate-1 mt-2 shadow-[4px_4px_0px_#1a1a1a]">
                Hartu Parte!
              </span>
            </h2>
            <div className="text-zinc-800 text-xs sm:text-sm leading-relaxed font-sans space-y-4 font-medium">
              <p className="font-black text-black text-sm sm:text-base">
                Hau ez da kontsumitzeko jaialdi bat, bizitzeko jaialdi bat baizik. Hemen ez dago langile ordaindurik, ezta babesle pribaturik ere. KRISTON BURRUNDAIE aurrera aterako bada, guztion lanari esker izango da.
              </p>
              <p>
                Inor mugituko ez balitz, asfaltoa hotz geratuko litzateke eta kriseiluak itzalita. Eredu komertzialetik kanpo geratzeko, txandak eginez, garbiketan arituz eta azpiegiturak geuk altxatuz borrokatzen dugu gure espazioa.
              </p>
            </div>

            {/* Auzolana Info Cards: Nola Lagundu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-[#f4f4f2] p-5 border-2 border-black space-y-3 shadow-[4px_4px_0px_#1a1a1a]">
                <div className="w-8 h-8 rounded-none bg-black text-white flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h4 className="font-sans font-black text-black text-xs sm:text-sm uppercase tracking-wider">TXANDAK EGINEZ</h4>
                <p className="text-zinc-800 text-xs font-sans font-medium leading-relaxed">
                  Txosnan, garbiketan, muntaian edo desmuntaian jendea behar dugu bidean laguntzeko. Apuntatu gure koadro azpiko koordinatzailean!
                </p>
                <button
                  id="open-general-form-btn"
                  onClick={() => setIsGeneralFormOpen(true)}
                  className="text-[#ff3b30] hover:text-[#e02b20] font-mono text-xs font-black uppercase tracking-widest block cursor-pointer"
                >
                  Bete Formulario Orokorra &raquo;
                </button>
              </div>

              <div className="bg-[#f4f4f2] p-5 border-2 border-black space-y-3 shadow-[4px_4px_0px_#1a1a1a]">
                <div className="w-8 h-8 rounded-none bg-black text-white flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h4 className="font-sans font-black text-black text-xs sm:text-sm uppercase tracking-wider">FINANTZIAZIOA</h4>
                <p className="text-zinc-800 text-xs font-sans font-medium leading-relaxed">
                  Irabazi asmorik gabeko ekimena denez, jaialdia txosnako kontsumizioekin eta materialaren salmentekin (kamisetak, txapak...) ordaintzen da. Kontsumitu herrikoi eta lagundu gastuak estaltzen!
                </p>
                <span className="text-zinc-650 text-[10px] uppercase font-mono tracking-widest font-black">EZ MULTINAZIONALEI</span>
              </div>
            </div>
          </div>

          {/* Statistics Box */}
          <div className="lg:col-span-5 bg-white border-4 border-black p-6 space-y-6 shadow-[6px_6px_0px_rgba(26,26,26,1)] text-black">
            <h3 className="font-sans font-black text-black uppercase tracking-tight text-lg flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#ff3b30]" />
              <span>Auzolan Lan Estatistikak</span>
            </h3>
            
            <p className="text-[11px] font-mono text-zinc-700 leading-normal font-bold">
              Ezagutu une bakoitzean jaialdia aurrera ateratzeko zenbat kide garen eta zein den gure lanbide indarra. Denok batuta egingo dugu aurrera!
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f4f4f2] p-4 border-2 border-black text-center">
                <span className="text-3xl font-sans font-black text-black">{totalRegistered}</span>
                <span className="block text-[10px] font-mono text-zinc-700 uppercase mt-1 font-black">APUNTATUAK</span>
              </div>
              <div className="bg-[#f4f4f2] p-4 border-2 border-black text-center">
                <span className="text-3xl font-sans font-black text-[#ff3b30]">{totalVolunteersNeeded - totalRegistered}</span>
                <span className="block text-[10px] font-mono text-zinc-700 uppercase mt-1 font-black">FALTA DIRENAK</span>
              </div>
            </div>

            {/* Coverage percentage visualizer */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-black">
                <span className="text-zinc-700 uppercase">Estaldura Osoa:</span>
                <span className="text-black font-black">{overallCoveragePercent}%</span>
              </div>
              <div className="w-full h-4 bg-zinc-100 border-2 border-black p-0.5">
                <div
                  className="h-full bg-[#ff3b30] transition-all duration-500 border-r border-black"
                  style={{ width: `${overallCoveragePercent}%` }}
                />
              </div>
            </div>

            <button
              id="header-general-form-trigger"
              onClick={() => setIsGeneralFormOpen(true)}
              className="w-full py-3 bg-[#ff3b30] text-white hover:bg-[#e02b20] font-sans font-black uppercase text-xs tracking-widest border-2 border-black shadow-[4px_4px_0px_#1a1a1a] active:translate-y-0.5 transition-all cursor-pointer"
            >
              Apuntatu txandaren batean 📋
            </button>
          </div>
        </div>

        {/* INTERACTIVE SHIFT WORKSPACE */}
        <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-8 shadow-[6px_6px_0px_#1a1a1a] text-black mt-16">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-black pb-6">
            <div>
              <h3 className="text-xl font-sans font-black text-black uppercase flex items-center space-x-2">
                <Flame className="w-5 h-5 text-[#ff3b30] animate-spin" />
                <span>TXANDEN TAULA KUDEATZAILEA</span>
              </h3>
              <p className="text-xs text-zinc-700 font-mono mt-0.5 font-bold">Hautatu eta apuntatu, ez utzi zuloak asfaltoan!</p>
            </div>

            {/* Category Filter buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#e4e4e0] border-2 border-black">
              <button
                id="filter-shifts-all"
                onClick={() => setSelectedRoleFilter('All')}
                className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase cursor-pointer ${
                  selectedRoleFilter === 'All' ? 'bg-[#ff3b30] text-white border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' : 'text-zinc-800 hover:bg-white border border-transparent'
                }`}
              >
                Guztiak
              </button>
              {rolesList.map((rl) => (
                <button
                  id={`filter-shifts-${rl.replace(/\s+/g, '')}`}
                  key={rl}
                  onClick={() => setSelectedRoleFilter(rl)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-black uppercase cursor-pointer ${
                    selectedRoleFilter === rl ? 'bg-[#ff3b30] text-white border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' : 'text-zinc-800 hover:bg-white border border-transparent'
                  }`}
                >
                  {rl}
                </button>
              ))}
            </div>
          </div>

          {/* Shifts Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShifts.map((shift) => {
              const currentCount = shift.volunteers.length;
              const isFilled = currentCount >= shift.needed;
              const pct = Math.round((currentCount / shift.needed) * 100);

              return (
                <div
                  id={`shift-card-${shift.id}`}
                  key={shift.id}
                  className={`p-5 border-2 flex flex-col justify-between transition-colors ${
                    isFilled 
                      ? 'bg-zinc-50 border-zinc-300 text-zinc-500' 
                      : 'bg-white border-black text-black shadow-[4px_4px_0px_#1a1a1a]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header: Role & Time */}
                    <div className="flex items-center justify-between">
                      <div className={`px-2 py-0.5 border text-[10px] font-mono uppercase font-black flex items-center space-x-1.5 ${getRoleColorClass(shift.role)}`}>
                        {getRoleIcon(shift.role)}
                        <span>{shift.role}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-zinc-600 font-mono text-[10px] font-black">
                        <Clock className="w-3.5 h-3.5 text-[#ff3b30]" />
                        <span>{shift.time}</span>
                      </div>
                    </div>

                    {/* Progress details */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-mono font-black">
                        <span className="text-zinc-700">Herrikideak: {currentCount} / {shift.needed}</span>
                        <span className={isFilled ? 'text-green-600' : 'text-red-600'}>
                          {isFilled ? 'BETETA ✊' : `${pct}%`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-100 border-2 border-black rounded-none">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isFilled ? 'bg-green-500' : 'bg-[#ff3b30]'
                          }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Volunteers list breakdown */}
                    <div className="py-2">
                      <p className="text-[10px] font-mono uppercase text-zinc-600 tracking-wider mb-2 font-black">Parte Hartzen dutenak:</p>
                      {currentCount === 0 ? (
                        <p className="text-xs text-[#ff3b30] font-sans italic font-black">Txanda libre dago! Lagundu orain!</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                          {shift.volunteers.map((vol) => (
                            <span
                              key={vol}
                              className="text-[11px] font-sans bg-neutral-100 text-black pl-2 pr-1 py-0.5 border border-black font-bold inline-flex items-center gap-1 group"
                            >
                              <span>{vol}</span>
                              <button
                                title="Kendu nire izena"
                                onClick={() => handleUnregister(shift.id, vol)}
                                className="text-zinc-600 hover:text-red-500 font-mono text-[9px] cursor-pointer font-black"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Signup buttons inside card */}
                  <div className="pt-4 border-t-2 border-black mt-3">
                    <button
                      id={`signup-shift-btn-${shift.id}`}
                      disabled={isFilled}
                      onClick={() => setSelectedShiftForSignUp(shift)}
                      className={`w-full py-2 text-xs font-mono font-black uppercase text-center transition-all cursor-pointer ${
                        isFilled
                          ? 'bg-zinc-100/50 text-zinc-400 border border-zinc-200 cursor-not-allowed'
                          : 'bg-[#ff3b30] text-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none'
                      }`}
                    >
                      {isFilled ? 'TXANDA BETETA EGON DA' : 'APUNTATU NEURE TALDEAN!'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL 1: Specific Shift sign up modal */}
      {selectedShiftForSignUp && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-black">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_#1a1a1a] max-w-sm w-full p-6 relative"
          >
            <button
              id="close-signup-modal"
              onClick={() => setSelectedShiftForSignUp(null)}
              className="absolute top-4 right-4 text-[#ff3b30] hover:text-[#e02b20] font-sans text-xs uppercase font-black cursor-pointer"
            >
              [X ITXI]
            </button>

            <form onSubmit={handleSignUpConfirm} className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#ff3b30] uppercase font-black">APUNTATU TXANDARA</span>
                <h3 className="text-xl font-sans font-black uppercase text-black">{selectedShiftForSignUp.role}</h3>
                <p className="text-xs text-zinc-700 font-mono font-bold">Ordutegia: {selectedShiftForSignUp.time}</p>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono text-black uppercase font-black">Zure Izena (Abizenarekin hobe):</label>
                <input
                  id="v-name-input"
                  type="text"
                  required
                  placeholder="Idatzi zure izena..."
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full bg-white text-black placeholder-zinc-400 border-2 border-black text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-black uppercase font-black">Telefono Zenbakia (Antolatzaileentzat soilik):</label>
                <input
                  id="v-phone-input"
                  type="tel"
                  placeholder="Adibidez: 654 321 098"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full bg-white text-black placeholder-zinc-400 border-2 border-black text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                />
                <p className="text-[9px] font-mono text-zinc-650 font-bold">
                  *Telefonoa bakarrik erabiliko da azken orduko koordinazio aldaketarik badago deitzeko.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  id="v-signup-cancel-btn"
                  type="button"
                  onClick={() => setSelectedShiftForSignUp(null)}
                  className="px-4 py-2 bg-white hover:bg-zinc-50 border-2 border-black text-xs font-mono uppercase font-black cursor-pointer"
                >
                  Utzi
                </button>
                <button
                  id="v-signup-submit-btn"
                  type="submit"
                  className="px-4 py-2 bg-[#ff3b30] text-white hover:bg-[#e02b20] text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  Apuntatu nago! ✊
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: General Application Shift Form as literal text required */}
      {isGeneralFormOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-black">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-4 border-black text-black shadow-[8px_8px_0px_#1a1a1a] max-w-md w-full p-6 relative"
          >
            <button
              id="close-general-form-modal"
              onClick={() => setIsGeneralFormOpen(false)}
              className="absolute top-4 right-4 text-[#ff3b30] hover:text-[#e02b20] font-sans text-xs uppercase font-black cursor-pointer"
            >
              [X ITXI]
            </button>

            <form onSubmit={handleGeneralFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#ff3b30] uppercase font-black">IZEN-EMATE OROKOR FORMULARIOA</span>
                <h3 className="text-2xl font-sans font-black uppercase text-black">Sartu Auzolanean</h3>
                <p className="text-xs text-zinc-750 leading-snug font-bold">
                  Hona hemen txandarako prestasuna eta informazio orokorra bidaltzeko formulario ofiziala. Bete ezazu eta antolatzaileok zurekin harremanetan jarriko gara.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono text-black uppercase mb-1 font-black">Izen Abizenak (*):</label>
                  <input
                    id="g-form-name"
                    type="text"
                    required
                    placeholder="Zure izen beltza..."
                    value={generalFormData.name}
                    onChange={(e) => setGeneralFormData({ ...generalFormData, name: e.target.value })}
                    className="w-full bg-white text-black placeholder-zinc-400 border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-black uppercase mb-1 font-black">E-posta helbidea (*):</label>
                    <input
                      id="g-form-email"
                      type="email"
                      required
                      placeholder="zure_posta@posta.eus"
                      value={generalFormData.email}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, email: e.target.value })}
                      className="w-full bg-white text-black placeholder-zinc-450 border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-black uppercase mb-1 font-black">Telefonoa:</label>
                    <input
                      id="g-form-phone"
                      type="tel"
                      placeholder="telefonoa..."
                      value={generalFormData.phone}
                      onChange={(e) => setGeneralFormData({ ...generalFormData, phone: e.target.value })}
                      className="w-full bg-white text-black placeholder-zinc-450 border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-black uppercase mb-1 font-black">Lanbide Hobetsia:</label>
                  <select
                    id="g-form-role"
                    value={generalFormData.role}
                    onChange={(e) => setGeneralFormData({ ...generalFormData, role: e.target.value as ShiftRole })}
                    className="w-full bg-white text-black border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] rounded-none font-bold"
                  >
                    {rolesList.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-black uppercase mb-1 font-black">Ordutegi Prestasuna:</label>
                  <input
                    id="g-form-time"
                    type="text"
                    placeholder="Adib: Eguerdian / Azken txandetan prest..."
                    value={generalFormData.timePreference}
                    onChange={(e) => setGeneralFormData({ ...generalFormData, timePreference: e.target.value })}
                    className="w-full bg-white text-black placeholder-zinc-450 border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-black uppercase mb-1 font-black">Ekarpenak edo Idazkiak:</label>
                  <textarea
                    id="g-form-comments"
                    rows={2}
                    placeholder="Adib: Gidatzen naiz, furgoneta daukat, soinu mahairako prest..."
                    value={generalFormData.comments}
                    onChange={(e) => setGeneralFormData({ ...generalFormData, comments: e.target.value })}
                    className="w-full bg-white text-black placeholder-zinc-450 border-2 border-black text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] rounded-none font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  id="g-form-cancel"
                  type="button"
                  onClick={() => setIsGeneralFormOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-zinc-50 border-2 border-black text-xs font-mono uppercase font-black cursor-pointer"
                >
                  Utzi
                </button>
                <button
                  id="g-form-submit"
                  type="submit"
                  className="px-4 py-2 bg-[#ff3b30] text-white hover:bg-[#e02b20] text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  Bidali Auzolanera! ⚡
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
