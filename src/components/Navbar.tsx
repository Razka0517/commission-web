'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Commission', href: '/' },
    { name: 'Queue', href: '/queue' },
    { name: 'Terms', href: '/terms' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-accent-red shadow-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="font-bold text-xl tracking-tighter text-white z-50 relative font-header">
          reina<span className="text-white/80">kocchi!</span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
          
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`relative transition-colors font-header tracking-wide
                  ${isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
                
                {isActive && (
                  <motion.span 
                    layoutId="nav-indicator" 
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-white rounded-full shadow-sm"
                  />
                )}
              </Link>
            );
          })}

          <Link 
            href="/contact"
            className="bg-white text-accent-red px-6 py-2 rounded-full text-xs font-bold hover:bg-deep-purple hover:text-white transition-colors ml-4 shadow-lg font-header"
          >
            Contact Me
          </Link>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 text-white p-2 focus:outline-none"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="block w-full h-0.5 bg-white origin-center" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block w-full h-0.5 bg-white" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="block w-full h-0.5 bg-white origin-center" />
          </div>
        </button>

        {/* --- MOBILE FULLSCREEN MENU --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              // Mobile Menu Background
              className="fixed inset-0 bg-accent-red pt-24 px-6 md:hidden flex flex-col gap-6 h-screen z-40"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`text-3xl font-bold border-b border-white/20 pb-4 font-header
                    ${pathname === link.href ? 'text-white pl-4 border-white' : 'text-white/60'}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/contact"
                onClick={() => setIsOpen(false)} 
                className="w-full block text-center bg-white text-accent-red py-4 rounded-xl font-bold text-lg mt-4 font-header shadow-lg"
              >
                Contact Me
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}