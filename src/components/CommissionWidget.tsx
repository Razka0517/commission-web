'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Import Komponen Anak
import CommissionCharacter from '@/components/commision/CommissionCharacter';
import CommissionIllustration from '@/components/commision/CommissionIlustration';
import CommissionChibi from '@/components/commision/CommissionChibi';
import CommissionEmotes from '@/components/commision/CommissionEmotes';
import CommissionPNGTuber from '@/components/commision/CommissionPNGTuber';

const CONTACTS = {
  discord: "https://discord.com/users/508215420461776896", 
  twitter: "https://x.com/reinakocchi",
  instagram: "https://www.instagram.com/reinakocchi",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=reinachamhada@gmail.com",
  nsfwForm: "https://forms.google.com/your-r18-form-link"
};

const CATEGORIES = [
  { id: 'character', label: 'Character' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'chibi', label: 'Chibi' },
  { id: 'emotes', label: 'Emotes' },
  { id: 'pngtuber', label: 'PNGTuber' }, 
  { id: 'live2d', label: 'Live2D' },
  { id: 'stinger', label: 'Stinger' },
];

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

export default function CommissionWidget() {
  const [activeCategory, setActiveCategory] = useState('character');
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const fadeAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 relative font-sans">
      
      {/* MENU KATEGORI */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 border-b-2 border-accent-red/10 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 text-sm font-bold uppercase tracking-wider transition-all
              ${activeCategory === cat.id 
                ? 'text-accent-red border-b-2 border-accent-red' 
                : 'text-zinc-400 hover:text-accent-red'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* KONTEN UTAMA */}
      <AnimatePresence mode='wait'>
        
        {activeCategory === 'character' && (
          <motion.div key="character" initial="hidden" animate="visible" exit="exit" variants={fadeAnim}>
            <CommissionCharacter 
              isMobile={isMobile} 
              onOpenModal={() => setShowModal(true)} 
              onViewImage={setLightboxImage} 
            />
          </motion.div>
        )}

        {activeCategory === 'illustration' && (
          <motion.div key="illustration" initial="hidden" animate="visible" exit="exit" variants={fadeAnim}>
            <CommissionIllustration 
              onOpenModal={() => setShowModal(true)} 
              onViewImage={setLightboxImage} 
            />
          </motion.div>
        )}

        {activeCategory === 'chibi' && (
          <motion.div key="chibi" initial="hidden" animate="visible" exit="exit" variants={fadeAnim}>
            <CommissionChibi 
            isMobile={isMobile}
              onOpenModal={() => setShowModal(true)} 
              onViewImage={setLightboxImage} 
            />
          </motion.div>
        )}

        {activeCategory === 'emotes' && (
          <motion.div key="emotes" initial="hidden" animate="visible" exit="exit" variants={fadeAnim}>
            <CommissionEmotes 
              onOpenModal={() => setShowModal(true)} 
              onViewImage={setLightboxImage} 
            />
          </motion.div>
        )}

        {activeCategory === 'pngtuber' && (
          <motion.div key="pngtuber" initial="hidden" animate="visible" exit="exit" variants={fadeAnim}>
            <CommissionPNGTuber 
              onOpenModal={() => setShowModal(true)} 
            />
          </motion.div>
        )}

        {/* --- COMING SOON SECTION (DENGAN ICON MAINTENANCE GENERAL) --- */}
        {!['character', 'illustration', 'chibi', 'emotes', 'pngtuber'].includes(activeCategory) && (
          <motion.div 
            key="empty" 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            variants={fadeAnim} 
            className="w-full flex flex-col items-center justify-center py-24 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 group hover:border-deep-purple/30 transition-colors"
          >
             <div className="mb-6 p-6 bg-white rounded-full shadow-sm text-zinc-300 group-hover:text-deep-purple group-hover:shadow-md transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
               </svg>

             </div>

             <h3 className="text-2xl font-bold text-deep-purple mb-2 font-header">
                {CATEGORIES.find(c => c.id === activeCategory)?.label}
             </h3>
             <p className="text-zinc-500 text-sm mb-4">
               This category is currently under maintenance.
             </p>
             <span className="px-4 py-2 bg-zinc-200 text-zinc-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Coming Soon
             </span>
          </motion.div>
        )}

      </AnimatePresence>

      {/* --- LIGHTBOX (PORTAL) --- */}
      <AnimatePresence>
        {lightboxImage && (
           <Portal>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setLightboxImage(null)}
               className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
             >
                <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
                   <Image src={lightboxImage} alt="Full Preview" fill quality={100} unoptimized sizes="100vw" className="object-contain" />
                </div>
                <p className="mt-6 text-white/50 text-sm font-bold uppercase tracking-widest animate-pulse">Click anywhere to close</p>
             </motion.div>
           </Portal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white p-8 rounded-3xl max-w-lg w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-deep-purple mb-2 text-center font-header">Order Form</h3>
              <p className="text-zinc-500 text-center mb-8 text-sm">Where would you like to send your request?</p>
              
              <div className="mb-6">
                 <a href={CONTACTS.nsfwForm} target="_blank" rel="noreferrer" className="w-full flex items-center gap-4 p-4 rounded-xl bg-accent-red/5 border border-accent-red hover:bg-accent-red hover:text-white transition-all group">
                    <div className="w-10 h-10 rounded-full bg-accent-red text-white group-hover:bg-white group-hover:text-accent-red flex items-center justify-center shrink-0">!</div>
                    <div>
                       <div className="font-bold text-accent-red group-hover:text-white">NSFW / R-18 Order</div>
                       <div className="text-xs text-accent-red/60 group-hover:text-white/80">Via Google Form</div>
                    </div>
                 </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <a href={CONTACTS.discord} target="_blank" rel="noreferrer" className="p-3 bg-zinc-5 hover:bg-[#5865F2] hover:text-white rounded-xl border border-zinc-200 hover:border-[#5865F2] transition-all flex flex-col items-center gap-2 group">
                    <svg className="text-[#5865F2] group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.435 13.435 0 0 0-.585 1.206 18.423 18.423 0 0 0-4.793 0 13.483 13.483 0 0 0-.586-1.206.074.074 0 0 0-.078-.037 19.773 19.773 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                    <span className="text-xs font-bold">Discord</span>
                 </a>
                 <a href={CONTACTS.twitter} target="_blank" rel="noreferrer" className="p-3 bg-zinc-5 hover:bg-black hover:text-white rounded-xl border border-zinc-200 hover:border-black transition-all flex flex-col items-center gap-2 group">
                    <svg className="text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <span className="text-xs font-bold">Twitter / X</span>
                 </a>
                 <a href={CONTACTS.instagram} target="_blank" rel="noreferrer" className="p-3 bg-zinc-5 hover:bg-pink-600 hover:text-white rounded-xl border border-zinc-200 hover:border-pink-600 transition-all flex flex-col items-center gap-2 group">
                    <svg className="text-pink-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span className="text-xs font-bold">Instagram</span>
                 </a>
                 <a href={CONTACTS.email} target="_blank" rel="noreferrer" className="p-3 bg-zinc-5 hover:bg-accent-red hover:text-white rounded-xl border border-zinc-200 hover:border-accent-red transition-all flex flex-col items-center gap-2 group">
                    <svg className="text-zinc-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <span className="text-xs font-bold">Email</span>
                 </a>
              </div>
              <button onClick={() => setShowModal(false)} className="mt-6 text-sm text-zinc-400 hover:text-deep-purple underline w-full">Cancel</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}