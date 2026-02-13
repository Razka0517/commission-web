'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- CONFIG ZOOM LENGKAP (MOBILE & DESKTOP) ---
// Atur angka x/y di sini untuk pas-in posisi muka Chibi
const ZOOM_CONFIG = {
  bustup: {
    // Zoom ke muka Chibi
    mobile:  { scale: 1.645, y: "-7%", x: "15%" }, 
    desktop: { scale: 1.65, y: "-7%", x: "15%" }, 
  },
  fullbody: {
    // Tampilan utuh
    mobile:  { scale: 1.07, y: "0%", x: "0%" },
    desktop: { scale: 1, y: "0%", x: "0%" },
  },
};

const PRICING_CHIBI = [
  { id: 'bustup',   price: 20, label: 'Bust Up' },
  { id: 'fullbody', price: 40, label: 'Full Body' },
];

interface Props {
  isMobile: boolean; // <-- Tambah ini biar tau lagi di HP atau Laptop
  onOpenModal: () => void;
  onViewImage: (src: string) => void;
}

export default function CommissionChibi({ isMobile, onOpenModal, onViewImage }: Props) {
  const [selectedType, setSelectedType] = useState('fullbody');

  // Logic pilih varian animasi berdasarkan device
  const imageVariants = {
    bustup: { 
      scale: isMobile ? ZOOM_CONFIG.bustup.mobile.scale : ZOOM_CONFIG.bustup.desktop.scale, 
      y: isMobile ? ZOOM_CONFIG.bustup.mobile.y : ZOOM_CONFIG.bustup.desktop.y,
      x: isMobile ? ZOOM_CONFIG.bustup.mobile.x : ZOOM_CONFIG.bustup.desktop.x 
    },
    fullbody: { 
      scale: isMobile ? ZOOM_CONFIG.fullbody.mobile.scale : ZOOM_CONFIG.fullbody.desktop.scale, 
      y: isMobile ? ZOOM_CONFIG.fullbody.mobile.y : ZOOM_CONFIG.fullbody.desktop.y,
      x: isMobile ? ZOOM_CONFIG.fullbody.mobile.x : ZOOM_CONFIG.fullbody.desktop.x 
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 min-h-[500px]">
       
       {/* KIRI: PREVIEW INTERAKTIF */}
       <div className="relative w-full h-[400px] md:h-[500px] md:w-1/2 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 flex flex-col shadow-inner">
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-accent-red/20 flex items-center gap-2 shadow-sm pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
            <span className="text-xs text-accent-red font-bold tracking-widest uppercase">
              Live Preview
            </span>
          </div>

          <div 
            className="flex-1 relative w-full h-full cursor-zoom-in group"
            onClick={() => onViewImage('/chibi/chibi2.png')} 
          >
             {/* Motion Div dengan Variants baru */}
             <motion.div
               initial="fullbody"
               animate={selectedType} // 'bustup' atau 'fullbody'
               variants={imageVariants} // <-- Pakai config canggih tadi
               transition={{ type: 'spring', stiffness: 100, damping: 20 }}
               className="relative w-full h-full origin-top"
             >
                <Image 
                  src="/chibi/chibi2.png" 
                  alt="Chibi Preview" 
                  fill 
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-xl" 
                />
             </motion.div>

             <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm border border-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Click image to expand
             </div>
          </div>
       </div>

       {/* KANAN: DESKRIPSI & HARGA */}
       <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-6">
             <h2 className="text-3xl font-bold text-deep-purple mb-2 font-header">Chibi Commission</h2>
             
             <p className="text-zinc-600 text-sm leading-relaxed mb-4">
               A single or multiple character with plain or simple background (sky, pattern, solid color) + transparent.
             </p>
             {/* --- ETA BADGE --- */}
             <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 bg-zinc-50 px-3 py-2 rounded-lg w-fit border border-zinc-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span><strong>ETA:</strong> 1 Weeks - 3 Weeks</span>
              </div>
             <div className="bg-deep-purple/5 text-deep-purple px-4 py-3 rounded-xl text-xs font-medium border border-deep-purple/10 leading-relaxed">
               *Price can increase +$5-$10 depending on complexity, such as adding an object like a weapon/effect/pet.
             </div>
          </div>

          <div className="border border-zinc-200 rounded-lg overflow-hidden mb-8 shadow-sm">
            <div className="flex bg-deep-purple text-white text-xs font-bold uppercase py-3 px-4">
              <div className="flex-1">Character (Chibi)</div>
              <div className="w-20 text-right">Price</div>
            </div>
            <div className="bg-white divide-y divide-zinc-100">
             {PRICING_CHIBI.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setSelectedType(item.id)}
                 className={`w-full flex justify-between items-center p-4 text-left transition-all hover:bg-zinc-50
                   ${selectedType === item.id ? 'bg-accent-red/5' : ''}`}
               >
                 <div>
                   <div className={`font-bold text-sm ${selectedType === item.id ? 'text-accent-red' : 'text-deep-purple'}`}>
                     {item.label}
                   </div>
                 </div>
                 <div className={`font-bold font-header ${selectedType === item.id ? 'text-accent-red' : 'text-deep-purple'}`}>
                   ${item.price}
                 </div>
               </button>
             ))}
            </div>
         </div>

         <button 
           onClick={onOpenModal} 
           className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] hover:shadow-xl active:scale-95 transition-all group"
         >
           Order Here!
         </button>
       </div>
    </div>
  );
}