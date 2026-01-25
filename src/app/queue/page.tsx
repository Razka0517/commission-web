'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

// Tipe Data
type TrelloLabel = {
  id: string;
  name: string;
  color: string; 
};

type TrelloCard = {
  id: string;
  name: string;
  labels: TrelloLabel[];
  due: string | null;
};

type TrelloList = {
  id: string;
  name: string;
  cards: TrelloCard[];
};

export default function QueuePage() {
  const [queueData, setQueueData] = useState<TrelloList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State Error

  const fetchQueue = async () => {
    setLoading(true);
    setError(null); // Reset error sebelum fetch ulang

    try {
      const res = await fetch('/api/queue');
      
      // Cek apakah response sukses (200 OK)
      if (!res.ok) {
        throw new Error('Failed to connect to server');
      }

      const data = await res.json();
      
      // Cek jika backend kirim pesan error
      if (data.error) {
        throw new Error(data.error);
      }
      
      setQueueData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Queue Error:", err);
      setError("Failed to load queue data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // Helper Warna Label
  const getLabelColor = (colorName: string) => {
    switch (colorName) {
      case 'green': return 'bg-emerald-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      case 'sky': return 'bg-sky-400';
      case 'pink': return 'bg-pink-500';
      case 'black': return 'bg-zinc-800';
      default: return 'bg-zinc-400';
    }
  };

  // Animasi
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-white text-deep-purple relative font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-header text-accent-red mb-4">
            Commission Queue
          </h1>
          <p className="text-zinc-500">
            Real-time status updates directly from my workspace.
          </p>
        </div>

        {/* --- LOGIC TAMPILAN --- */}
        {loading ? (
          // 1. TAMPILAN LOADING
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="bg-zinc-100 h-80 rounded-2xl animate-pulse"></div>
             ))}
          </div>
        ) : error ? (
          // 2. TAMPILAN ERROR (Handler)
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 border border-red-100 rounded-2xl text-center">
             <div className="text-4xl mb-4">⚠️</div>
             <h3 className="text-xl font-bold text-accent-red mb-2">Oops! Something went wrong.</h3>
             <p className="text-zinc-600 mb-6">{error}</p>
             <button 
               onClick={fetchQueue} 
               className="px-6 py-2 bg-accent-red text-white font-bold rounded-lg hover:bg-[#7a3542] transition-colors"
             >
               Try Again
             </button>
          </div>
        ) : (
          // 3. TAMPILAN DATA SUKSES
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          >
            {queueData.map((list) => (
              <motion.div 
                key={list.id} 
                variants={itemVars}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm min-h-[200px]"
              >
                <div className="flex justify-between items-center border-b-2 border-zinc-200 pb-3 mb-4">
                  <h3 className="font-bold text-deep-purple font-header text-lg uppercase tracking-wide">
                    {list.name}
                  </h3>
                  <span className="text-xs font-bold bg-white border border-zinc-200 text-zinc-400 px-2 py-1 rounded-md">
                    {list.cards.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {list.cards.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400 text-sm italic border-2 border-dashed border-zinc-200 rounded-xl">
                      Empty List
                    </div>
                  ) : (
                    list.cards.map((card) => (
                      <div key={card.id} className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        {card.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {card.labels.map((label, idx) => (
                              <span 
                                key={idx}
                                className={`h-2 w-8 rounded-full ${getLabelColor(label.color)}`}
                                title={label.name} 
                              />
                            ))}
                          </div>
                        )}
                        <div className="font-bold text-deep-purple text-sm leading-snug">
                          {card.name}
                        </div>
                        {card.due && (
                           <div className="mt-3 flex items-center gap-1 text-[10px] text-accent-red font-bold uppercase bg-accent-red/5 px-2 py-1 rounded w-fit">
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             {new Date(card.due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                           </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
      </div>
    </main>
  );
}