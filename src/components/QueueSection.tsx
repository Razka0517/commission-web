'use client';

import { motion } from 'framer-motion';

// --- DATA DUMMY (SAMA) ---
const IN_PROGRESS = [
  { id: 1, client: 'Kitsu', status: 'Sketching', progress: 30, date: 'Started 2 days ago' },
  { id: 2, client: 'Hakon', status: 'Lineart', progress: 65, date: 'Started yesterday' },
  { id: 3, client: 'Feral Cat', status: 'Rendering', progress: 90, date: 'Almost done' },
];

const COMPLETED = [
  { id: 101, client: 'Tankgex', date: '20 Jan 2026' },
  { id: 102, client: 'Brina', date: '18 Jan 2026' },
  { id: 103, client: 'Harakon', date: '15 Jan 2026' },
  { id: 104, client: 'Guest User', date: '10 Jan 2026' },
];

export default function QueueSection() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-deep-purple mb-2 font-header">Work Queue</h2>
        <div className="h-1 w-20 bg-accent-red mx-auto rounded-full mb-4"></div>
        <p className="text-deep-purple/60">Real-time status tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* --- KOLOM KIRI: ON THE BENCH --- */}
        <div>
          <h3 className="text-xl font-bold text-deep-purple mb-6 flex items-center gap-2 font-header">
            <span className="w-3 h-3 rounded-full bg-accent-red animate-pulse"></span>
            On The Bench
          </h3>

          <div className="space-y-4">
            {IN_PROGRESS.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-deep-purple border border-lavender/20 p-5 rounded-2xl relative overflow-hidden group shadow-lg"
              >
                {/* Info Client */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className="font-bold text-white font-header">{item.client}</div>
                    <div className="text-xs text-lavender font-mono uppercase tracking-wider mt-1">{item.status}</div>
                  </div>
                  <div className="text-xs text-white/40">{item.date}</div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden relative z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent-red to-pink-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- KOLOM KANAN: RECENTLY FINISHED --- */}
        <div>
          <h3 className="text-xl font-bold text-deep-purple mb-6 flex items-center gap-2 font-header">
            <span className="text-accent-red">✔</span>
            Recently Finished
          </h3>

          <div className="bg-white border border-lavender/30 rounded-2xl p-6 shadow-sm">
            <div className="space-y-6 relative">
              
              {/* Garis Vertikal */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-lavender/30"></div>

              {COMPLETED.map((item) => (
                <div key={item.id} className="relative pl-8 flex items-center justify-between group">
                  <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-accent-red"></div>
                  <span className="text-deep-purple font-medium font-sans">{item.client}</span>
                  <span className="text-xs text-deep-purple/40 font-mono">{item.date}</span>
                </div>
              ))}

            </div>
          </div>

          {/* Banner Status Kecil */}
          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
             <div className="p-2 bg-green-100 rounded-full text-green-600">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
             </div>
             <div>
               <div className="text-sm font-bold text-green-800 font-header">Commissions OPEN!</div>
               <div className="text-xs text-green-600">Queue is moving fast. Slot available.</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}