'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-deep-purple relative font-sans">
      <Navbar />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto pt-40 pb-20 px-6 text-center"
      >
        
        <div className="relative w-56 h-56 mx-auto mb-6">
           <Image 
             src="/pfp.png" 
             alt="Profile" 
             fill 
             quality={100}
             className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" 
           />
        </div>

        <h1 className="text-4xl font-bold text-accent-red font-header mb-2">reinakocchi!</h1>
        <p className="text-zinc-500 font-bold mb-8">hi! i'm reina <span className="bg-[#E6E6FA] px-2 py-0.5 text-deep-purple text-xs rounded-md ml-1">English/Bahasa Indonesia</span></p>

        <div className="max-w-lg mx-auto text-deep-purple font-medium leading-relaxed space-y-4">
           <p>I'm an artist based in Indonesia and I have been drawing digitally since 2016.</p>
           <p>Focusing on character illustration in Anime & Game style.</p>
           <p>I have worked for making small merchandises for my own store and anime cons.</p>
        </div>

        {/* Gambar Buku */}
        <motion.div 
          initial={{ rotate: 10, opacity: 0 }}
          animate={{ rotate: 12, opacity: 0.8 }}
          whileHover={{ rotate: 0, opacity: 1, scale: 1.1 }}
          className="mt-12 flex justify-center"
        >
           <div className="relative w-40 h-40 transition-all duration-500">
              <Image src="/book.png" alt="Book" fill className="object-contain" />
           </div>
        </motion.div>

      </motion.div>
       
       {/* Footer */}
      <footer className="text-center py-6 text-deep-purple/40 text-xs border-t border-deep-purple/5 relative z-30">
        &copy; 2026 reinakocchi. All rights reserved.
      </footer>
    </main>
  );
}