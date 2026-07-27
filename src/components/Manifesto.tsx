/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartCrack, Users, AlertOctagon, Heart, Zap } from 'lucide-react';

export default function Manifesto() {
  const objectives = [
    {
      icon: <Users className="w-8 h-8 text-[#ff3b30]" />,
      title: 'Kalea eta espazio publikoa herriarentzat',
      text: 'Azken urteetan espazio publikoaren pribatizazioa ematen ari da. Era berean, eragile artistiko, kultural eta sozialok (tartean musikariok) traba burokratiko asko jasan behar izaten ditugu ekimenak antolatzerako orduan (ordutegiak, baimenak...). Kriston burrundaie ekimenaren bidez, kaleko artearen eta espazio publikoaren erabilera askearen aldeko aldarria zabaldu nahi dugu.',
    },
    {
      icon: <HeartCrack className="w-8 h-8 text-[#ff3b30]" />,
      title: 'Eszena antikomertzialaren alde, makrojaialdien aurka',
      text: 'Euskal Herrian eszena komertziala nagusitzen ari da gero eta era nabariagoan: makrojaialdiak, sala handiak, VIP eremuak eta sarrera garestiak. Joera horrek herrietako txosnaguneetan eta gaztetxeen inguruan sortu izan den oinarrizko eszena herrikoia ahuldu du. Jaialdi handi horiek enpresa pribatuek antolatzen dituzte, helburu bakar batekin: antolatzaileen poltsikoak betetzea. KRISTON BURRUNDAIE irabazi asmorik gabeko ekimena da. Hemen lortzen den euro bakoitza eszena antikomertziala elikatzeko eta herri-kultura bultzatzeko izango da.',
    },
    {
      icon: <Zap className="w-8 h-8 text-[#ff3b30]" />,
      title: 'Herriko taldeen arteko saretzea',
      text: 'Batzuetan sakabanatuta gaude, bakoitza bere lokalean edo bere txokoan, elkarren berri handirik gabe. Ekimen hau elkarlanean antolatzeak elkar hobeto ezagutzeko eta gure arteko zubiak eraikitzeko balio du. Elkarlanak indartsuago egiten gaitu, eta egun honekin taldeen arteko saretze trinko eta iraunkor bat abiatu nahi dugu.',
    },
    {
      icon: <AlertOctagon className="w-8 h-8 text-[#ff3b30]" />,
      title: 'Ekitaldiaren oinarrizko printzipioak',
      text: 'Printzipio argi batzuk ditugu: irabazi-asmorik gabeko ekitaldia da hau, eta ez dugu inolako zapalkuntzarik onartzen (matxismoa, arrazismoa edo bestelako bazterkeriarik). Guztiontzako espazio seguru bat izatea da gure helburua.',
    },
  ];

  return (
    <section id="manifestua" className="py-24 bg-white border-t-2 border-b-2 border-black relative scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section with raw editorial style */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff3b30] bg-[#ff3b30]/10 px-3 py-1.5 border-2 border-black font-black shadow-[2px_2px_0px_#1a1a1a]">
              Gure Muina eta Aldarrikapena
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-[#1a1a1a] uppercase pt-4">
            Zergatik <span className="underline decoration-[#ff3b30] decoration-wavy decoration-2">Kriston Burrundaie</span>?
          </h2>
          <p className="font-serif italic text-[#1a1a1a] text-lg sm:text-xl leading-relaxed text-left sm:text-center mt-8 border-l-4 border-[#ff3b30] sm:border-l-0 pl-4 sm:pl-0">
            Gaur egun, gure kaleak gero eta lotuago daude instituzioen kontrolera edo enpresa pribatuen interes komertzialetara. Espazio publikoaren erabilera horren aurrean, herriko talde eta kulturzaleok gure txanda dela oihukatzera gatoz. Kaleak bizirik nahi ditugulako, eta gure espazioak okupatzeko eta kudeatzeko zilegitasun osoa dugulako. KRISTON BURRUNDAIE festa bat da, bai, baina baita aldarrikapen oihu bat ere.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full flex flex-col bg-white p-6 sm:p-8 pt-10 border-2 border-black relative group shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_#ff3b30] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#ff3b30] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-transform">
                {obj.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-sans font-black text-black uppercase tracking-tight mb-3 leading-snug">
                  {obj.title}
                </h3>
                <div className="w-12 h-1 bg-[#ff3b30] mb-4" />
                <p className="text-[#2d2d2d] text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {obj.text}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-dashed border-zinc-300">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-black">Oinarria</span>
                <span className="font-mono text-lg font-black text-zinc-200 group-hover:text-[#ff3b30]/40 transition-colors select-none">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimo Etikoak (Lerro Gorriak Panel) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#ff3b30] text-black p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_rgba(26,26,26,1)] relative overflow-hidden"
        >
          {/* Diagonal Caution Pattern for Punk Poster Style */}
          <div className="absolute top-0 right-0 h-full w-24 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_10px,transparent_10px,transparent_20px)] opacity-50 hidden md:block" />

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex items-center space-x-3">
              <AlertOctagon className="w-8 h-8 text-black shrink-0 animate-pulse" />
              <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tighter uppercase text-black">
                KRISTON BURRUNDAIEn Etika
              </h3>
            </div>
            
            <p className="font-sans font-black text-sm sm:text-base leading-snug max-w-3xl text-black">
              Parte hartzen duten talde, norbanako zein ikusle guztiek bete beharko dituzte gure etikak. Bizikidetza eta autogestioaren loraldirako oinarrizko konpromisoak dira hauek:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-white text-black p-5.5 border-2 border-black flex flex-col justify-between shadow-[4px_4px_0px_rgba(26,26,26,1)]">
                <div>
                  {/* <div className="text-xl mb-2">🚫</div> */}
                  <h4 className="font-sans font-black text-xs sm:text-sm uppercase tracking-wider text-[#ff3b30] mb-2">INTEGRITATEA ETA ERRESPETUA</h4>
                  <p className="text-[#2d2d2d] text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Ideia matxista, arrazista, homofobo, transfobo eta faxistak irmoki baztertzen ditugu. Gure espazioak eremu seguru eta askeak dira guztiontzat. Ez dugu eraso motarik onartuko.
                  </p>
                </div>
              </div>

              <div className="bg-white text-black p-5.5 border-2 border-black flex flex-col justify-between shadow-[4px_4px_0px_rgba(26,26,26,1)]">
                <div>
                  {/* <div className="text-xl mb-2">✊</div> */}
                  <h4 className="font-sans font-black text-xs sm:text-sm uppercase tracking-wider text-[#ff3b30] mb-2">AUTOGESTIOA ETA ERANTZUKIZUNA</h4>
                  <p className="text-[#2d2d2d] text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Ekimen honen oinarria autogestioa da: guk geuk pentsatu, guk geuk eraiki eta guk geuk babesten dugu. Zuzentasunez, elkartasunez eta erantzukizun osoz jokatzea bertaratutako guztion ardura da.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
