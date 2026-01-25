'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion'; // Tambahkan 'Variants' di sini

// --- HARGA PNGTUBER ---
const PRICING_PNGTUBER = [
  { label: '3 Expressions Set', price: '60 - 100' },
];

interface Props {
  onOpenModal: () => void;
}

export default function CommissionPNGTuber({ onOpenModal }: Props) {
  // State animasi
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  
  // State Emosi (Normal, Angry, Drink)
  const [currentEmotion, setCurrentEmotion] = useState<'normal' | 'angry' | 'drink'>('normal');

  // LOGIKA KEDIP (BLINKING)
  useEffect(() => {
    if (currentEmotion === 'drink') return;

    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); 
      const nextBlink = Math.random() * 3000 + 2000;
      setTimeout(blinkLoop, nextBlink);
    };
    
    const timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, [currentEmotion]);

  // LOGIKA PEMILIHAN GAMBAR
  const getCurrentImage = () => {
    if (currentEmotion === 'drink') return '/pngtuber/drink.png';

    const prefix = currentEmotion; 

    if (isTalking && isBlinking) return `/pngtuber/${prefix}-talk-blink.png`;
    if (isTalking) return `/pngtuber/${prefix}-talk.png`;
    if (isBlinking) return `/pngtuber/${prefix}-blink.png`;
    
    return `/pngtuber/${prefix}-idle.png`;
  };

  // DEFINISI VARIAN ANIMASI (FIXED: Ditambah tipe ': Variants')
  const bounceVariants: Variants = {
    idle: { 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    talking: { 
      y: [0, -8, 0], 
      transition: { 
        duration: 0.4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  // Helper untuk stop talking (Mobile Safety)
  const stopTalking = () => setIsTalking(false);

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 min-h-[500px]">
       
       {/* KIRI: INTERACTIVE PREVIEW */}
       <div className="relative w-full md:w-1/2 flex flex-col gap-4">
          
          {/* BOX PREVIEW */}
          <div 
            className="relative w-full aspect-square bg-zinc-100 rounded-2xl overflow-hidden border-2 border-zinc-200 shadow-inner flex items-center justify-center cursor-pointer group select-none"
            // MATIKAN KLIK KANAN (Save Image Popup)
            onContextMenu={(e) => e.preventDefault()} 
            
            // INTERAKSI DESKTOP (Hover)
            onMouseEnter={() => setIsTalking(true)}
            onMouseLeave={stopTalking}
            
            // INTERAKSI MOBILE (Touch Hold)
            onTouchStart={() => setIsTalking(true)}
            onTouchEnd={stopTalking}   // Lepas jari = Stop
            onTouchCancel={stopTalking} // Jari kepleset keluar = Stop (SAFETY NET)
          >
             {/* Background Grid Hiasan */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]"></div>

             {/* KARAKTER */}
             <motion.div
               variants={bounceVariants}
               // Kondisi: Kalau lagi minum, jangan loncat meskipun ditekan
               animate={(isTalking && currentEmotion !== 'drink') ? "talking" : "idle"}
               className="relative w-[90%] h-[90%]"
             >
                <Image 
                  src={getCurrentImage()} 
                  alt="PNGTuber Avatar" 
                  fill 
                  quality={100}
                  className="object-contain drop-shadow-xl pointer-events-none" // pointer-events-none penting biar gambar gak ke-blok biru di HP
                />
             </motion.div>

             {/* STATUS BAR (Bawah Kanan) */}
             <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-md
                ${isTalking && currentEmotion !== 'drink' ? 'bg-green-500 text-white' : 'bg-white text-zinc-400'}
             `}>
                <div className={`w-2 h-2 rounded-full ${isTalking && currentEmotion !== 'drink' ? 'bg-white animate-pulse' : 'bg-zinc-300'}`}></div>
                {isTalking && currentEmotion !== 'drink' ? 'VOICE DETECTED' : 'MIC OFF'}
             </div>

             {/* HINT (Atas Kiri) */}
             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-deep-purple shadow-sm pointer-events-none border border-zinc-200">
                Hover / Hold to Talk
             </div>
          </div>

          {/* EMOTION SWITCHER */}
          <div className="flex gap-2 justify-center">
             <button 
               onClick={() => setCurrentEmotion('normal')}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${currentEmotion === 'normal' ? 'bg-deep-purple text-white border-deep-purple' : 'bg-white text-zinc-500 border-zinc-200 hover:border-deep-purple'}`}
             >
               Normal
             </button>
             <button 
               onClick={() => setCurrentEmotion('angry')}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${currentEmotion === 'angry' ? 'bg-accent-red text-white border-accent-red' : 'bg-white text-zinc-500 border-zinc-200 hover:border-accent-red'}`}
             >
               Angry
             </button>
             <button 
               onClick={() => setCurrentEmotion('drink')}
               className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${currentEmotion === 'drink' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-zinc-500 border-zinc-200 hover:border-blue-500'}`}
             >
               Custom Emote
             </button>
          </div>
       </div>

       {/* KANAN: INFO & HARGA */}
       <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-6">
             <span className="bg-accent-red/10 text-accent-red px-3 py-1 rounded text-xs font-bold uppercase mb-2 inline-block">
                Interactive Assets
             </span>
             <h2 className="text-3xl font-bold text-deep-purple mb-2 font-header">PNGTuber Model</h2>
             
             <p className="text-zinc-600 text-sm leading-relaxed mb-4">
               Live2D alternative, animations captured with sound trigger. <br/>
               Perfect for streamers who want a reactive avatar without a webcam.
             </p>
          </div>

          <div className="border border-zinc-200 rounded-lg overflow-hidden mb-8 shadow-sm">
            <div className="flex bg-deep-purple text-white text-xs font-bold uppercase py-3 px-4">
              <div className="flex-1">Package</div>
              <div className="w-24 text-right">Price</div>
            </div>
            <div className="bg-white divide-y divide-zinc-100">
             {PRICING_PNGTUBER.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center p-4 hover:bg-zinc-50 transition-colors">
                 <div className="font-bold text-sm text-deep-purple">{item.label}</div>
                 <div className="font-bold font-header text-accent-red">${item.price}</div>
               </div>
             ))}
            </div>
         </div>

         <button 
           onClick={onOpenModal} 
           className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] active:scale-95 transition-all"
         >
           Order Here!
         </button>
       </div>
    </div>
  );
}