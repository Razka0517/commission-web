'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// CONFIG ZOOM & POSISI
const ZOOM_CONFIG = {
  headshot: {
    mobile:  { scale: 2.9, y: "-7%", x: "-10%" }, 
    desktop: { scale: 4.3, y: "-10%", x: "-12%" }, 
  },
  halfbody: {
    mobile:  { scale: 1.9, y: "-7%", x: "-8%" },
    desktop: { scale: 3, y: "-11%", x: "-6%" },
  },
  fullbody: {
    mobile:  { scale: 0.92, y: "-2.3%", x: "0%" },
    desktop: { scale: 1.25, y: "5%", x: "0%" },
  }
};

type PricingItem = { id: string; price: number; label: string; desc: string };

const PRICING_NORMAL: Record<string, PricingItem> = {
  headshot: { id: 'headshot', price: 30, label: 'Bust Up', desc: 'Waist up, standard detailing.' },
  halfbody: { id: 'halfbody', price: 65, label: 'Half Body', desc: 'Hips up, includes simple background.' },
  fullbody: { id: 'fullbody', price: 80, label: 'Full Body', desc: 'Complete design + transparent BG.' },
  sketch:   { id: 'sketch',   price: 15, label: 'Bust Up Sketch', desc: 'Clean colored sketch, simple shading.' },
};

const PRICING_SKEB: Record<string, PricingItem> = {
  // Deskripsi dikosongkan agar tabel terlihat bersih sesuai request
  headshot: { id: 'headshot', price: 25, label: 'Bust Up', desc: '' },
  halfbody: { id: 'halfbody', price: 50, label: 'Half Body', desc: '' },
  fullbody: { id: 'fullbody', price: 75, label: 'Full Body', desc: '' },
};

const SKETCH_IMAGES = ['sketch1.png', 'sketch2.png', 'sketch3.png', 'sketch4.png'];

interface Props {
  isMobile: boolean;
  onOpenModal: () => void;
  onViewImage: (src: string) => void;
}

export default function CommissionCharacter({ isMobile, onOpenModal, onViewImage }: Props) {
  const [characterStyle, setCharacterStyle] = useState<'normal' | 'skeb'>('normal'); 
  const [selectedType, setSelectedType] = useState<string>('fullbody');

  // Reset selected type saat ganti style
  useEffect(() => {
    if (characterStyle === 'skeb' && selectedType === 'sketch') {
      setSelectedType('fullbody');
    }
  }, [characterStyle]);

  const currentPricing = characterStyle === 'normal' ? PRICING_NORMAL : PRICING_SKEB;

  const imageVariants = {
    headshot: { 
      scale: isMobile ? ZOOM_CONFIG.headshot.mobile.scale : ZOOM_CONFIG.headshot.desktop.scale, 
      y: isMobile ? ZOOM_CONFIG.headshot.mobile.y : ZOOM_CONFIG.headshot.desktop.y,
      x: isMobile ? ZOOM_CONFIG.headshot.mobile.x : ZOOM_CONFIG.headshot.desktop.x 
    },
    halfbody: { 
      scale: isMobile ? ZOOM_CONFIG.halfbody.mobile.scale : ZOOM_CONFIG.halfbody.desktop.scale, 
      y: isMobile ? ZOOM_CONFIG.halfbody.mobile.y : ZOOM_CONFIG.halfbody.desktop.y,
      x: isMobile ? ZOOM_CONFIG.halfbody.mobile.x : ZOOM_CONFIG.halfbody.desktop.x 
    },
    fullbody: { 
      scale: isMobile ? ZOOM_CONFIG.fullbody.mobile.scale : ZOOM_CONFIG.fullbody.desktop.scale, 
      y: isMobile ? ZOOM_CONFIG.fullbody.mobile.y : ZOOM_CONFIG.fullbody.desktop.y,
      x: isMobile ? ZOOM_CONFIG.fullbody.mobile.x : ZOOM_CONFIG.fullbody.desktop.x 
    },
    sketch: { scale: 1, y: 0, x: 0 } 
  };

  const slideAnim = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 min-h-[500px]">
      
      {/* KIRI: PREVIEW */}
      {/* UPDATE: 'md:h-auto' diganti 'md:h-[600px]' agar tinggi tetap stabil (tidak kepotong saat konten kanan sedikit) */}
      <div className="relative w-full h-[450px] md:h-[650px] md:w-1/2 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 flex flex-col shadow-inner">
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-accent-red/20 flex items-center gap-2 shadow-sm pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
            <span className="text-xs text-accent-red font-bold tracking-widest uppercase">
              {selectedType === 'sketch' ? 'Sketch Samples' : 'Live Preview'}
            </span>
          </div>

          <div className="flex-1 relative w-full h-full">
            {selectedType === 'sketch' ? (
              <div className="w-full h-full p-6 pt-16 grid grid-cols-2 gap-3 bg-white overflow-y-auto">
                {SKETCH_IMAGES.map((img, index) => (
                  <div key={index} onClick={() => onViewImage(`/sketches/${img}`)} className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 group cursor-pointer">
                    <Image 
                      src={`/sketches/${img}`} 
                      alt={`Sketch ${index}`} 
                      fill 
                      quality={100} // Gambar Tajam
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">View</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="absolute inset-0 flex items-start justify-center pt-8 md:pt-10 cursor-zoom-in group" 
                onClick={() => onViewImage("/fullbody.png")}
              >
                <motion.div 
                  initial="fullbody" 
                  animate={selectedType} 
                  variants={imageVariants} 
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }} 
                  className="relative w-[300px] h-[600px] origin-top"
                >
                  <Image 
                    src="/fullbody.png" 
                    alt="Preview" 
                    fill 
                    priority 
                    quality={100} // Gambar Tajam tapi Cepat (Next.js Optimize)
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw" // Penting buat ketajaman Mobile
                    className="object-contain object-top drop-shadow-2xl" 
                  />
                </motion.div>
                
                {/* Hint Text (Desktop Only) */}
                <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm border border-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Click image to expand
                </div>
              </div>
            )}
          </div>
      </div>

      {/* KANAN: CONTROLS */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex bg-zinc-100 p-1 rounded-lg mb-6 self-start">
            <button onClick={() => setCharacterStyle('normal')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${characterStyle === 'normal' ? 'bg-white text-deep-purple shadow-sm' : 'text-zinc-400 hover:text-deep-purple'}`}>NORMAL STYLE</button>
            <button onClick={() => setCharacterStyle('skeb')} className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${characterStyle === 'skeb' ? 'bg-accent-red text-white shadow-sm' : 'text-zinc-400 hover:text-accent-red'}`}>SKEB STYLE</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={characterStyle} initial="initial" animate="animate" exit="exit" variants={slideAnim} className="w-full">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-deep-purple mb-2 font-header">
                  {characterStyle === 'normal' ? 'Normal Commission' : 'Skeb Style'}
                </h2>
                {/* Deskripsi SAMA untuk keduanya */}
                <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                  A single or multiple character with plain or simple background (sky, pattern, solid color) + transparent.
                </p>
                {/* Notes tambahan HANYA untuk Normal Style */}
                  <div className="bg-deep-purple/5 text-deep-purple px-4 py-2 rounded-lg text-xs font-bold inline-block border border-deep-purple/10">
                    *Price can increase +$5-$10 depending on complexity, such as adding an object like a weapon/effect/pet
                  </div>
              </div>
              
              <div className="border border-zinc-200 rounded-lg overflow-hidden mb-8 shadow-sm">
                <div className={`flex text-white text-xs font-bold uppercase py-3 px-4 ${characterStyle === 'normal' ? 'bg-deep-purple' : 'bg-accent-red'}`}>
                  <div className="flex-1">{characterStyle === 'normal' ? 'Type' : 'Skeb Type'}</div>
                  <div className="w-20 text-right">Price</div>
                </div>
                <div className="bg-white divide-y divide-zinc-100">
                  {Object.values(currentPricing).map((item) => (
                    <button key={item.id} onClick={() => setSelectedType(item.id)} className={`w-full flex justify-between items-center p-4 text-left transition-all hover:bg-zinc-50 ${selectedType === item.id ? 'bg-accent-red/5' : ''}`}>
                      <div>
                        <div className={`font-bold text-sm ${selectedType === item.id ? 'text-accent-red' : 'text-deep-purple'}`}>{item.label}</div>
                        {/* Deskripsi hanya muncul jika ada (Normal Style) */}
                        {item.desc && <div className="text-xs text-zinc-400 mt-0.5">{item.desc}</div>}
                      </div>
                      <div className={`font-bold font-header ${selectedType === item.id ? 'text-accent-red' : 'text-deep-purple'}`}>${item.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button onClick={onOpenModal} className="w-full bg-accent-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#7a3542] active:scale-95 transition-all group">
            <span className="group-hover:text-white/90 transition-colors">Order Here!</span>
          </button>
      </div>
    </div>
  );
}