'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants, LayoutGroup, Transition } from 'framer-motion';

interface Props {
  onOpenModal: () => void;
}

export default function CommissionPNGTuber({ onOpenModal }: Props) {
  const [selectedType, setSelectedType] = useState('normal');
  const [hasExtra, setHasExtra] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const [isBlinking, setIsBlinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'normal' | 'angry' | 'drink'>('normal');

  useEffect(() => {
    setHasExtra(false);
    setIsDropdownOpen(false);
  }, [selectedType]);

  useEffect(() => {
    if (selectedType !== 'normal' || currentEmotion === 'drink') return;
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); 
      const nextBlink = Math.random() * 3000 + 2000;
      setTimeout(blinkLoop, nextBlink);
    };
    const timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, [currentEmotion, selectedType]);

  const getCurrentImage = () => {
    if (currentEmotion === 'drink') return '/pngtuber/drink.png';
    const prefix = currentEmotion; 
    if (isTalking && isBlinking) return `/pngtuber/${prefix}-talk-blink.png`;
    if (isTalking) return `/pngtuber/${prefix}-talk.png`;
    if (isBlinking) return `/pngtuber/${prefix}-blink.png`;
    return `/pngtuber/${prefix}-idle.png`;
  };

  const bounceVariants: Variants = {
    idle: { y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
    talking: { y: [0, -8, 0], transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" } }
  };

  const stopTalking = () => setIsTalking(false);

  // FIX ERROR DISINI: Menambahkan tipe ': Transition' agar TypeScript tidak bingung
  const springTransition: Transition = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 min-h-[500px]">
       
       {/* --- KIRI: PREVIEW AREA --- */}
       <div className="relative w-full md:w-1/2 flex flex-col gap-4">
          {selectedType === 'normal' ? (
            <>
              <div 
                className="relative w-full aspect-square bg-zinc-100 rounded-2xl overflow-hidden border-2 border-zinc-200 shadow-inner flex items-center justify-center cursor-pointer group select-none"
                onContextMenu={(e) => e.preventDefault()} 
                onMouseEnter={() => setIsTalking(true)}
                onMouseLeave={stopTalking}
                onTouchStart={() => setIsTalking(true)}
                onTouchEnd={stopTalking}
                onTouchCancel={stopTalking}
              >
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <motion.div
                   variants={bounceVariants}
                   animate={(isTalking && currentEmotion !== 'drink') ? "talking" : "idle"}
                   className="relative w-[90%] h-[90%]"
                 >
                    <Image src={getCurrentImage()} alt="PNGTuber Avatar" fill quality={100} className="object-contain drop-shadow-xl pointer-events-none"/>
                 </motion.div>
                 <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-md ${isTalking && currentEmotion !== 'drink' ? 'bg-green-500 text-white' : 'bg-white text-zinc-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${isTalking && currentEmotion !== 'drink' ? 'bg-white animate-pulse' : 'bg-zinc-300'}`}></div>
                    {isTalking && currentEmotion !== 'drink' ? 'VOICE DETECTED' : 'MIC OFF'}
                 </div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-deep-purple shadow-sm pointer-events-none border border-zinc-200">Hover / Hold to Talk</div>
              </div>
              <div className="flex gap-2 justify-center">
                 {['normal', 'angry', 'drink'].map((emote) => (
                   <button key={emote} onClick={() => setCurrentEmotion(emote as any)} className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${currentEmotion === emote ? 'bg-deep-purple text-white border-deep-purple' : 'bg-white text-zinc-500 border-zinc-200 hover:border-deep-purple'}`}>
                     {emote === 'drink' ? 'Custom Emote' : emote}
                   </button>
                 ))}
              </div>
            </>
          ) : (
            <div className="w-full aspect-square bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center text-center p-8 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.02)_0,rgba(0,0,0,0.02)_10px,transparent_10px,transparent_20px)]">
               <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
               </div>
               <h3 className="text-xl font-bold text-deep-purple mb-2">Under Construction</h3>
               <p className="text-sm text-zinc-500 mb-4">Samples for Fully Animated PNGTuber are being prepared.</p>
            </div>
          )}
       </div>

       {/* --- KANAN: INFO & HARGA (LAYOUT GROUP WRAPPER) --- */}
       <LayoutGroup>
         <div className="w-full md:w-1/2 flex flex-col justify-center">
            
            {/* 1. DESCRIPTION SECTION */}
            <motion.div layout transition={springTransition} className="mb-6">
               <span className="bg-accent-red/10 text-accent-red px-3 py-1 rounded text-xs font-bold uppercase mb-2 inline-block">
                  Interactive Assets
               </span>
               <h2 className="text-3xl font-bold text-deep-purple mb-2 font-header">PNGTuber Model</h2>
               
               <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                 Live2D alternative, animations captured with sound trigger,
                 perfect for streamers who want a reactive avatar without a webcam. Model made by using PNGtuber+ and PNGtuber remix <br/>
               </p>
               <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 bg-zinc-50 px-3 py-2 rounded-lg w-fit border border-zinc-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span><strong>ETA:</strong> 1 Month - 2 Months</span>
               </div>
            </motion.div>

            {/* 2. PRICING TABLE */}
            <motion.div 
              layout 
              transition={springTransition}
              className="border border-zinc-200 rounded-lg overflow-hidden mb-8 shadow-sm bg-white"
            >
              <div className="flex bg-deep-purple text-white text-xs font-bold uppercase py-3 px-4">
                <div className="flex-1">Package Type</div>
                <div className="w-24 text-right">Price</div>
              </div>
              
              <div className="divide-y divide-zinc-100">
               
               {/* NORMAL PACKAGE */}
               <motion.button
                 layout="position"
                 transition={springTransition}
                 onClick={() => setSelectedType('normal')}
                 className={`w-full flex justify-between items-center p-4 text-left transition-colors hover:bg-zinc-50
                   ${selectedType === 'normal' ? 'bg-accent-red/5' : ''}`}
               >
                 <div>
                   <div className={`font-bold text-sm ${selectedType === 'normal' ? 'text-accent-red' : 'text-deep-purple'}`}>
                     Normal PNGTuber
                   </div>
                   <div className="text-[10px] text-zinc-500 mt-0.5">Standard reactive model (Blink & Talk)</div>
                 </div>
                 <div className={`font-bold font-header ${selectedType === 'normal' ? 'text-accent-red' : 'text-deep-purple'}`}>
                   $100
                 </div>
               </motion.button>

               {/* FULLY ANIMATED PACKAGE */}
               <motion.div 
                 layout="position"
                 transition={springTransition}
                 className={`w-full transition-colors ${selectedType === 'animated' ? 'bg-accent-red/5' : 'hover:bg-zinc-50'}`}
               >
                  <motion.button 
                    layout="position" 
                    transition={springTransition}
                    onClick={() => setSelectedType('animated')}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <div>
                      <div className={`font-bold text-sm ${selectedType === 'animated' ? 'text-accent-red' : 'text-deep-purple'}`}>
                        Fully Animated
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Complex animation</div>
                    </div>
                    <div className={`font-bold font-header ${selectedType === 'animated' ? 'text-accent-red' : 'text-deep-purple'}`}>
                       {hasExtra ? '$165' : '$150'}
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {selectedType === 'animated' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ ...springTransition, opacity: { duration: 0.2 } }}
                        className="px-4 pb-4 overflow-hidden" 
                      >
                        <div className="relative">
                          <motion.label layout className="text-[10px] font-bold text-accent-red uppercase tracking-wider mb-2 block ml-1">
                             Configuration
                          </motion.label>
                          
                          <motion.button
                            layout
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between bg-white border border-zinc-200 hover:border-accent-red/50 px-4 py-3 rounded-xl shadow-sm transition-all text-sm font-medium text-deep-purple"
                          >
                            <span className="truncate">
                               {hasExtra ? 'With Extra Pet/Weapon (+$15)' : 'Base Model Only'}
                            </span>
                            <svg className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.button>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full bg-white border border-zinc-100 rounded-xl shadow-inner overflow-hidden"
                              >
                                 <button onClick={() => { setHasExtra(false); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-zinc-50 flex items-center justify-between group border-b border-zinc-50">
                                    <span className={`text-sm ${!hasExtra ? 'font-bold text-accent-red' : 'text-zinc-600'}`}>Base Model ($150)</span>
                                    {!hasExtra && <span className="text-accent-red text-xs">✓</span>}
                                 </button>
                                 <button onClick={() => { setHasExtra(true); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-zinc-50 flex items-center justify-between group">
                                    <span className={`text-sm ${hasExtra ? 'font-bold text-accent-red' : 'text-zinc-600'}`}>+ Extra Pet/Weapon/Etc (+$15)</span>
                                    {hasExtra && <span className="text-accent-red text-xs">✓</span>}
                                 </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
              </div>
            </motion.div>

           {/* 3. BUTTON ORDER */}
           <motion.button 
             layout 
             transition={springTransition}
             onClick={onOpenModal} 
             className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] active:scale-95 transition-all"
           >
             Order Here!
           </motion.button>
         </div>
       </LayoutGroup>

    </div>
  );
}