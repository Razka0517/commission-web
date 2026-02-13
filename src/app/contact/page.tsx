'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  // DETEKSI MOBILE / DESKTOP
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // LOGIC EMAIL LINK (Dynamic)
  const emailAddress = "reinachamhada@gmail.com";
  const emailWebLink = "https://mail.google.com/mail/?view=cm&fs=1&to=reinachamhada@gmail.com";
  
  const emailHref = isMobile 
    ? `mailto:${emailAddress}` 
    : emailWebLink;

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="min-h-screen bg-white text-deep-purple relative font-sans">
      <Navbar />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={container}
        className="max-w-xl mx-auto pt-32 pb-20 px-6 text-center"
      >
        
        <motion.div variants={fadeInUp} className="relative w-48 h-48 mx-auto mb-2">
           <Image 
             src="/reina-sit.png" 
             alt="Reina Sit" 
             fill 
             className="object-contain"
             priority
           />
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4 font-header text-accent-red">
          Get in Touch!
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-zinc-500 mb-12">
          Have a question? Feel free to reach out.
        </motion.p>

        <motion.div variants={fadeInUp} className="space-y-4">
          
          {/* --- VGEN (CUSTOM LOGO & COLOR) --- */}
          <a 
            href="https://vgen.co/reinakocchi" 
            target="_blank" 
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#B8FF26] text-deep-purple font-bold hover:shadow-lg hover:-translate-y-1 transition-all border border-[#B8FF26]"
          >
            {/* Logo Custom Image */}
            <div className="relative w-6 h-6">
               <Image 
                 src="/vgen-logo.png" 
                 alt="VGen" 
                 fill 
                 className="object-contain"
               />
            </div>
            <span>Order on VGen</span>
          </a>

          {/* DISCORD */}
          <a href="https://discord.com/users/508215420461776896" target="_blank" className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#5865F2] text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.435 13.435 0 0 0-.585 1.206 18.423 18.423 0 0 0-4.793 0 13.483 13.483 0 0 0-.586-1.206.074.074 0 0 0-.078-.037 19.773 19.773 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            <span>Discord (reinakocchi)</span>
          </a>

          {/* TWITTER / X */}
          <a href="https://x.com/reinakocchi" target="_blank" className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-black text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>Twitter / X</span>
          </a>

          {/* INSTAGRAM */}
          <a href="https://www.instagram.com/reinakocchi" target="_blank" className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-pink-600 text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Instagram</span>
          </a>

          {/* EMAIL (SMART LINK) */}
          <a 
            href={emailHref} 
            target="_blank" 
            rel="noreferrer" 
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-zinc-100 text-deep-purple font-bold border border-zinc-200 hover:bg-zinc-200 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Email</span>
          </a>

        </motion.div>
      </motion.div>
       {/* Footer */}
      <footer className="text-center py-6 text-deep-purple/40 text-xs border-t border-deep-purple/5 relative z-30">
        &copy; 2026 reinakocchi. All rights reserved.
      </footer>
    </main>
  );
}